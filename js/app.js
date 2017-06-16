$(document).ready(function () {

  var breakLength = 300; // 300 = 5 minutes. original break time
  var sessionLength = 1500; // 1500 = 25 minutes,original time, default time
  var sessionActive = true; // If true, work time is active. if false, break time is active.
  var leftoverSeconds;
  var minute;
  var timer = null; // will hold the setInterval function or clear it.
  var paused = true; // this is for the pause/continue button
  var timecopy = sessionLength; // will hold the original time value for the reset button.
  var breakcopy = breakLength; // will hold the original break value for the reset button.

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

          minute = Math.floor(sessionLength / 60);
          leftoverSeconds = sessionLength % 60;

          $("#clock-data h3").html(`${minute}:${leftoverSeconds}`);
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
  //play sound

  function switchSession(playsound) {
    if (playsound) {
      var buzzer = new Audio('../buzzer.mp3');
      buzzer.play();
    }

    if (sessionActive) {
      timeLeft = breakLength;
      leftoverSeconds = false;
    } else {
      leftoverSeconds = sessionLength;
      sessionActive = true;
    }
  }


  //reset button
  //buzzer when timer finishes

  // Displaying session length and break length.
 
  function updateTimerLengths() {
    if (sessionLength < 0) {
      sessionLength = 0;
    }

    if (breakLength < 0) {
      breakLength = 0;
    }
    $('#sessionNumber').html(sessionLength);
    $('#breakNumber').html(breakLength);
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
        sessionlength - 1
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

