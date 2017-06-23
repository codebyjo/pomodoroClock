$(document).ready(function () {

  var breakLength = 300; // 300 = 5 minutes. original break time
  var sessionLength = 1500; // 1500 = 25 minutes,original time, default time
  var sessionActive = true; // If true, work time is active. if false, break time is active.
  var leftoverSeconds;
  var minute;
  var timer = null; // will hold the setInterval function or clear it.
  var paused = true; // this is for the pause/continue button
  var timecopy = sessionLength;

  $("#sessionNumber").html(sessionLength / 60);
  $("#breakNumber").html(breakLength / 60);

  $("#pause").click(function () {

    if (paused) {
      paused = false;
      $("#pause p").html("Pause");
      $("#pause").css("background-color", "#bdc3c7");
    } else {
      paused = true;
      $("#pause p").html("Play");
      $("#pause").css("background-color", "#2ecc71");
    }

  });

  // Press to restart
  $("#reset").click(function () { //Reset function
    sessionActive = true;
    timecopy = sessionLength;

    minute = Math.floor(timecopy / 60);
    leftoverSeconds = timecopy % 60;

    $("#clock-data h3").html( ("00" + minute).substr(-2,2) + ":" + ("00" + leftoverSeconds).substr(-2,2) );
    clearInterval(timer);
    countdown();
  });

  //calling to start the countdown
  countdown();

  function countdown() {

    timer = setInterval(function () { // I feel like this takes an extra second before executing (visible second mismatch? OR is it taking that extra second added in countSeconds?);

      if (!paused) {

        timecopy -= 1;

        minute = Math.floor(timecopy / 60);
        leftoverSeconds = timecopy % 60;

        $("#clock-data h3").html( ("00" + minute).substr(-2,2) + ":" + ("00" + leftoverSeconds).substr(-2,2) );

        if (timecopy === 0) {
          onEndClock();
        }

      }

    }, 1000);

  }

  function onEndClock() {

    console.log("FINISHED!");
    var buzzer = new Audio('buzzer.mp3');
    buzzer.play();

    if (sessionActive) {
      sessionActive = false;
      timecopy = breakLength;
    } else {
      sessionActive = true;
      timecopy = sessionLength;
    }

  }

    //  Adjusting time on plus minus buttons

    // Break buttons
    $("#sessionMinus").click(function () {

      if (sessionLength > 60) {
        sessionLength -= 60;
        $("#sessionNumber").html(sessionLength / 60);
      }

    });

    $("#sessionPlus").click(function () {
      sessionLength += 60;
      $("#sessionNumber").html(sessionLength / 60);
    });

    $("#breakMinus").click(function () {

      if (breakLength > 60) {
        breakLength -= 60;
        $("#breakNumber").html(breakLength / 60);
      }

    });

    $("#breakPlus").click(function () {
      breakLength += 60;
      $("#breakNumber").html(breakLength / 60);
    });

});
