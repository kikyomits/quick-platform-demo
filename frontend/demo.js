var pod1Status = "";
var pod2Status = "";
var pod1LastSuccessTime;
var pod2LastSuccessTime;
var time;
var instanceID = makeid();
var startTime;
// 4 hours
var loopFor = 14400000000;
var color = "";

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

$(document).ready(function() {
  if ($.isNumeric(getUrlVars()["timeout"])) {
    loopFor = getUrlVars()["timeout"];
  }
  if (getUrlVars()["loop"] == "true") {
    loopFor = 9999999999999;
  }

  //podWarning(1);

  startTime = new Date().getTime();

  var theLoop = setInterval(function() {
    time = new Date().getTime();
    if (time - pod1LastSuccessTime > 3000) {
      console.log("Read taking longer than 5 seconds");
      podWarning(1);
    }
    if (time - startTime > loopFor) {
      //alert('Done!');
      clearInterval(theLoop);
      $(".full-wrapper").html(
        "<h3>Please refresh your browser to reconnect </h3>"
      );
    }
    var API_ENDPOINT = "demo-backend.apps.sandbox.jpn-pe.com";
    console.log("Call to " + API_ENDPOINT);
    $.ajax({
      url: `http://${API_ENDPOINT}/api/v1/color`,
      success: function(result) {
        console.log(result);
        var obj = JSON.parse(result);
        $(".apicolor").html(obj.color);
        $(".apicolor").css("color", obj.color);
        $("#pod1 .last-success").html(formattedTime());
        pod1LastSuccessTime = new Date().getTime();
        podUp(1);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr);
        podDown(1);
        $(".apicolor").html("???");
        $(".apicolor").css("color", "black");
      },
      timeout: 1000
    });

    //podUp(2);
    // }, 5000);
  }, 2000);
});

function podUp(num) {
  if (num == 1) {
    if (pod1Status == "up") {
      return;
    }
  }
  if (num == 2) {
    if (pod2Status == "up") {
      return;
    }
  }
  $("#pod" + num + " .status-text").html("All Systems Go");
  $("#pod" + num + " .status-wrapper").removeClass("red");
  $("#pod" + num + " .status-wrapper").removeClass("yellow");
  $("#pod" + num + " .status-wrapper").addClass("green");
  $("#pod" + num + " .pulsating-circle").removeClass("red");
  $("#pod" + num + " .pulsating-circle").removeClass("yellow");
  $("#pod" + num + " .pulsating-circle").addClass("green");
  if (num == 1) {
    pod1Status = "up";
  }
  if (num == 2) {
    pod2Status = "up";
  }
}

function podDown(num) {
  if (num == 1) {
    if (pod1Status == "down") {
      return;
    }
  }
  if (num == 2) {
    if (pod2Status == "down") {
      return;
    }
  }
  $("#pod" + num + " .status-text").html("He's dead, Jim");
  $("#pod" + num + " .status-wrapper").removeClass("green");
  $("#pod" + num + " .status-wrapper").removeClass("yellow");
  $("#pod" + num + " .status-wrapper").addClass("red");
  $("#pod" + num + " .pulsating-circle").removeClass("green");
  $("#pod" + num + " .pulsating-circle").removeClass("yellow");
  $("#pod" + num + " .pulsating-circle").addClass("red");
  if (num == 1) {
    pod1Status = "down";
  }
  if (num == 2) {
    pod2Status = "down";
  }
}

function podWarning(num) {
  if (num == 1) {
    if (pod1Status == "warning" || pod1Status == "down") {
      return;
    }
  }
  if (num == 2) {
    if (pod2Status == "warning" || pod2Status == "down") {
      return;
    }
  }
  $("#pod" + num + " .status-text").html("Taking longer than usual...");
  $("#pod" + num + " .status-wrapper").removeClass("green");
  $("#pod" + num + " .status-wrapper").removeClass("red");
  $("#pod" + num + " .status-wrapper").addClass("yellow");
  $("#pod" + num + " .pulsating-circle").removeClass("green");
  $("#pod" + num + " .pulsating-circle").removeClass("red");
  $("#pod" + num + " .pulsating-circle").addClass("yellow");
  if (num == 1) {
    pod1Status = "warning";
  }
  if (num == 2) {
    pod2Status = "warning";
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function formattedTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  //alert(h + ":" + m + ":" + s);
  return h + ":" + m + ":" + s;
}

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}
