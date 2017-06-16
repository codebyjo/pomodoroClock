$(document).ready(function () {

  var breakLength = 10; // 300 = 5 minutes. original break time
  var sessionLength = 20; // 1500 = 25 minutes,original time, default time
  var sessionActive = true; // If true, work time is active. if false, break time is active.
  var leftoverSeconds;
  var minute;
  var timer = null; // will hold the setInterval function or clear it.
  var paused = true; // this is for the pause/continue button
  var timecopy = sessionLength;

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
    $("#clock-data h3").html(timecopy);
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

  function iClickHandler(id) {
    switch (id) {
      case 'sessionPlus':
        sessionlength + 1;
        if (sessionActive) {
          timeCopy + 1;
        }
        break;
      case 'sessionMinus':
        sessionlength - 1;
        if (sessionActive) {
          timeCopy - 1;
        }
        break;
      case 'breakPlus':
        breakLength + 1;
        if (!sessionActive) {
          breakCopy + 1;
        }
        break;
      case 'breakMinus':
        breakLength - 1;
        if (!sessionActive) {
          breakCopy - 1;
        }
        break;
    }

    $('#sessionNumber').html(sessionLength);
    $('#breakNumber').html(breakLength);
    // Adjust timer
  }

});
