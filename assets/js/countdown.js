function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// Function to calculate the last Saturday of March for a given year in Finnish timezone
function getLastSaturdayOfMarch(year) {
  // Start with March 31st of the given year at 1 PM Finnish time
  var lastDay = new Date(year, 2, 31, 13, 0, 0, 0); // Month 2 = March (0-indexed)

  // Find the last Saturday by going backwards from March 31st
  while (lastDay.getDay() !== 6) {
    // 6 = Saturday
    lastDay.setDate(lastDay.getDate() - 1);
  }

  return lastDay;
}

// Get current year and calculate the deadline
var currentYear = new Date().getFullYear();
var deadline = getLastSaturdayOfMarch(currentYear);

// Get current time in Finnish timezone for comparison
var now = new Date();

// If the deadline has already passed this year, use next year's date
if (deadline < now) {
  deadline = getLastSaturdayOfMarch(currentYear + 1);
}

initializeClock('clockdiv', deadline);
