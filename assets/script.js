let today = moment().format("LLLL");
let date = today.toString();
$("#currentDay").append(date);
let hours = moment().hours();
let descriptionClasses = $(".description");
let i = 9;
// remove the time?
let hoursDay = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];

function displayValues(timeBlocks) {
  for (let i = 0; i < hoursDay.length; i++) {
    let hourDay = hoursDay[i];
    // checking if this timeblock exists
    if (timeBlocks[hourDay]) {
      let textAreaId = "#" + hourDay + "text";
      $(textAreaId).val(timeBlocks[hourDay].enteredVal);
    } else {
      let textAreaId = "#" + hourDay + "text";
      $(textAreaId).val("");
    }
  }
}

function loadPage() {
  checkDate();

  let appointments = getLocalStorage();

  displayValues(appointments);
}

function getLocalStorage() {
  return JSON.parse(window.localStorage.getItem("appointments")) || {};
}
function checkDate() {
  if (localStorage.getItem("appointments") !== null) {
    let registeredAp = JSON.parse(window.localStorage.getItem("appointments"));
    if (registeredAp.date !== moment().format("D")) {
      localStorage.clear();
    }
  }
}

$(".saveBtn").on("click", function (event) {
  checkDate();
  const timeId = $(this).siblings()[0].textContent;
  const enteredVal = $(this).siblings()[1].value;
  let appointments = getLocalStorage();
  let inputEl = {
    timeId: timeId,
    enteredVal: enteredVal,
    timeSubmitted: new moment().format("hh:mm:ss a"),
  };
  appointments[timeId] = inputEl;
  appointments.date = moment().format("D");
  // appointments.date = "20";

  window.localStorage.setItem("appointments", JSON.stringify(appointments));
  displayValues(appointments);
});

$(".description").each(function () {
  let newClass = "past";
  if (hours < i) {
    newClass = "future";
  } else if (hours === i) {
    newClass = "present";
  }
  $(this).addClass(newClass);
  i++;
});

// moment().format("MM DD"),
loadPage();
