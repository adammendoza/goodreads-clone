
const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) //|| {};
const userInfo = JSON.parse(localStorage.getItem('BADREADS_CURRENT_USER_ID')) //|| {};
// const activeInfo = JSON.parse(localStorage.getItem('activeInfo')) || {};
const $checkboxes = $("#availableGenres :checkbox");
const $selectAllButton = $("#genre-select-all");
const submitButton = document.getElementById('genre-submit');
// const $submitButton = $("#genre-submit")
const $genreForm = $("#genres-form");

function allChecked() {
  return $checkboxes.length === $checkboxes.filter(":checked").length;
}

function updateButtonStatus() {
  $selectAllButton.text(allChecked() ? "Uncheck all" : "Check all");
}

function handleButtonClick() {
  $checkboxes.prop("checked", allChecked() ? false : true)
}

function updateStorage() {
  $checkboxes.each(function () {
    genreInfo[this.id] = this.checked;
  });

  function updateActive() {
    $checkboxes.each(function () {
      if ($(this).is(":checked")) {
        $(this).attr("id").addClass("active");
      } else {
        $(this).attr("id").removeClass("active");
      }
    })
  }

  genreInfo["buttonText"] = $selectAllButton.text();
  localStorage.setItem("genreInfo", JSON.stringify(genreInfo));
  // localStorage.setItem("activeInfo", JSON.stringify(activeInfo));
}

$selectAllButton.on("click", function () {
  handleButtonClick();
  updateButtonStatus();
  // updateActive();
  updateStorage();
});

$checkboxes.on("change", function () {
  updateButtonStatus();
  // updateActive();
  updateStorage();
});

// On page load
$.each(genreInfo, function (key, value) {
  $("#" + key).prop('checked', value);
  // updateActive();
});

//
$selectAllButton.text(genreInfo["buttonText"]);

// submitButton.addEventListener("click", event => {
//   event.preventDefault();
//   const objectArray = [];
//   console.log(genreInfo);
//   for (let genre in genreInfo) {
//     if(genreInfo[genre]) {
//       objectArray.push(genre.split('-')[1]);
//     };
//   }
//   console.log(objectArray);
// });


submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const objectArray = [];
  for (let genre in genreInfo) {
    if (genreInfo[genre]) {
      objectArray.push(genre.split('-')[1]);
    };
  }
  console.log(`this is the object literal: ` + genreInfo);
  console.log(`this is the array: ` + objectArray);
  await fetch('/api-user/profile', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(
        "BADREADS_ACCESS_TOKEN"
      )}`,
    },
    body: JSON.stringify({ objectArray })
  })
    window.location.href = "user/profile";
});

// $(location).attr('href', '/user/profile');
// // })

// document.addEventListener("DOMContentLoaded", () => {

  // submitButton.addEventListener("click", event => {
  //   event.preventDefault();

  //   $(location).attr('href', '/user/profile');
  // })
// })
// $submitButton.on("click", function ( event ) {
//   const genre = document.getElementById("genres-form");
//   event.preventDefault();

//   const formData = new FormData(genre);

//   const checkbox = $('#genres-form').find("input[type=checkbox]");
//   $.each(checkbox, function (key, val) {
//     formData.append($(val).attr('name'), $(val).is(':checked'))
//   });
//   console.log(formData);
//
//   $(location).attr('href', '/user/profile');
// })


// old Code

// import { handleErrors } from './utils.js'

// // to obtain any information stored in local storage related to user's genre selections
// const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) || {};
// // select all the checkboxes
// // const genreSelections = document.querySelectorAll('input[type="checkbox"]:checked'), values = [];
// const genreSelections = document.querySelectorAll('.genre-container__checkbox'), values = [];

// // select  button
// const selectAllButton = document.getElementById('genre-select-all-button');
// // listen for a change on the boxes and iterate to update our key value pairs
// function isChecked(checkbox) {
//   return checkbox.checked === true;
// }

// let allChecked = () => genreSelections.length === genreSelections.filter(isChecked(checkbox));

// genreSelections.addEventListener("change", event => {

//   genreSelections.forEach(() => {
//     genreInfo[this.id] = this.checked;
//   });
//   // set new value of user genre selections in local storage
//   localStorage.setItem("genreInfo", JSON.stringify(genreInfo));
//   window.location.href = "user/shelves";
// });

// // when the page loads set the checkboxes
// genreInfo.forEach((key, value) => {
//   ('#' + key).checked = value;
// });





// localstorage split it and grab name with includes
