$(document).ready(function () {

  var breakLength = 300; // 300 = 5 minutes. original break time
  var sessionLength = 1500; // 1500 = 25 minutes,original time, default time
  var sessionActive = true; // If true, work time is active. if false, break time is active.
  var timer = null; // will hold the setInterval function or clear it.
  var paused = true; // this is for the pause/continue button
  var timecopy = sessionLength; // will hold the original time value for the reset button.
  var breakcopy = breakLength; // will hold the original break value for the reset button.

  $("#pause").click(function () {

    if (paused) {
      paused = false;
    } else {
      paused = true;
    }

  });

  // Press to restart
  $("#reset").click(function () { //Reset function
    sessionLength = timecopy;
    $("#clock-data h3").html(sessionLength);
    clearInterval(timer);
    countdown();
  });

  //calling to start the countdown
  countdown();

  function countdown() {

    timer = setInterval(function () { // I feel like this takes an extra second before executing (visible second mismatch? OR is it taking that extra second added in countSeconds?);

      if (!paused) {

        if (sessionActive) {
          sessionLength -= 1;
          // convert to
          $("#clock-data h3").html(sessionLength);
        }

        if (!sessionActive) {

        }

      }

    }, 1000);

  }

  function onEndClock() {
    console.log("FINISHED! START THE BREAK TIMER");
    sessionActive = false;
  }

  //switch between work and break times
  // when work finished, switch to break, vice versa
  //reset button
  //buzzer when timer finishes

});