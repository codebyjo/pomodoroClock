$(document).ready(function () {

  var countHours = 0;
  var countMinutes = 0;
  var countSeconds = 39 + 1; // Need to add 1 as countdown will subtract 1 before displaying.
  var originalHour = countHours;
  var originalMinute = countMinutes;
  var originalSeconds = countSeconds;
  var timer = null;
  var paused = false;

  $("#pause").click(function () {

    if (paused) {
      paused = false;
    } else {
      paused = true;
    }
    
  });
  
  $("#reset").click(function () { //Reset function

    countHours = originalHour;
    countMinutes = originalMinute;
    countSeconds = originalSeconds;
    clearInterval(timer);
    $("#clock-data h3").html(countHours + ":" + countMinutes + ":" + (countSeconds - 1));

    countdown();

  });


  countdown();


  function countdown() {
    console.log("READY");

    timer = setInterval(function () { // I feel like this takes an extra second before executing (visible second mismatch? OR is it taking that extra second added in countSeconds?);

      if (!paused) {

        countSeconds -= 1
        $("#clock-data h3").html(countHours + ":" + countMinutes + ":" + countSeconds);

        console.log(countHours, countMinutes, countSeconds);

        if (countSeconds == 0) {

          if (countMinutes == 0) {

            if (countHours == 0) {
              clearInterval(timer);
              onEndClock();
            } else {
              countSeconds = 60;
              countMinutes = 59;
              countHours -= 1;
            }

          } else {
            countSeconds = 60;
            countMinutes -= 1;
          }

        }

      }

    }, 1000);

    function onEndClock() {
      console.log("FINISHED!");
    }

  }

});