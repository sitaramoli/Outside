
// document.getElementsByTagName("body")[0].addEventListener("onload", start());
// function start() {
let main = document.getElementById("main");
let seconds = 0;
let startTimer = false;

// <---switch buttons--->
let switchButtons = document.createElement("div");
switchButtons.classList.add("switch-buttons");
// stopwatch button
let stopwatchBtn = document.createElement("button");
stopwatchBtn.classList.add("button");
stopwatchBtn.setAttribute("id", "stopwatch-btn");
stopwatchBtn.append("Stopwatch");
switchButtons.append(stopwatchBtn);
// clock button
let clockBtn = document.createElement("button");
clockBtn.classList.add("button");
clockBtn.setAttribute("id", "clock-btn");
clockBtn.append("Clock");
switchButtons.append(clockBtn);
main.append(switchButtons);
// <---switch buttons end--->

// clock
let clock = document.createElement("div");
clock.setAttribute("id", "clock");
main.appendChild(clock);

// stopwatch
let stopwatch = document.createElement("div");
stopwatch.setAttribute("id", "stopwatch");
stopwatch.append("00:00:00");
main.appendChild(stopwatch);

// <---control buttons--->
let controlButtons = document.createElement("div");
controlButtons.classList.add("control-buttons");
// start btn
let startBtn = document.createElement("button");
startBtn.classList.add("button", "control-button");
startBtn.setAttribute("id", "start-btn");
startBtn.append("Start");
controlButtons.append(startBtn);
// stop btn
let stopBtn = document.createElement("button");
stopBtn.classList.add("button", "control-button");
stopBtn.setAttribute("id", "stop-btn");
stopBtn.append("Stop");
controlButtons.append(stopBtn);
// reset btn
let resetBtn = document.createElement("button");
resetBtn.classList.add("button", "control-button");
resetBtn.setAttribute("id", "reset-btn");
resetBtn.append("Reset");
controlButtons.append(resetBtn);

main.appendChild(controlButtons);
document.getElementById("stopwatch-btn").addEventListener("click", showStopwatch);
document.getElementById("clock-btn").addEventListener("click", showClock);
document.getElementById("start-btn").addEventListener("click", startStopwatch);
document.getElementById("stop-btn").addEventListener("click", stopStopwatch);
document.getElementById("reset-btn").addEventListener("click", resetStopwatch);
// <---control buttons end--->
showStopwatch();

// }

// <---stopwatch start--->
function showStopwatch() {
  document.getElementById("clock").style.display = "none";
  document.getElementById("stopwatch").style.display = "block";
  document.getElementById("stopwatch-btn").classList.add("active");
  document.getElementById("clock-btn").classList.remove("active");
  document.getElementById("start-btn").removeAttribute("disabled");
  document.getElementById("stop-btn").setAttribute("disabled", "");
  document.getElementById("reset-btn").setAttribute("disabled", "");
}

function startStopwatch() {
  if (startTimer == false) {
    document.getElementById("start-btn").classList.add("active");
    document.getElementById("stop-btn").removeAttribute("disabled");
    document.getElementById("reset-btn").removeAttribute("disabled");
    document.getElementById("stop-btn").classList.remove("active");
    startTimer = true;
    startCount();
  }
}

function stopStopwatch() {
  if (startTimer == true) {
    document.getElementById("start-btn").classList.remove("active");
    document.getElementById("stop-btn").classList.add("active");
    startTimer = false;
  }

}

function resetStopwatch() {
  document.getElementById("stop-btn").setAttribute("disabled", "");
  document.getElementById("reset-btn").setAttribute("disabled", "");
  document.getElementById("stopwatch").innerText = "00:00:00";
  startTimer = false;
  seconds = 0;
}

function startCount() {
  if (startTimer == true) {
    debugger;
    seconds++;
    let hrs = checkNumber(Math.floor(seconds / 3600));
    let mins = checkNumber(Math.floor((seconds - hrs * 3600) / 60));
    let secs = checkNumber(seconds % 60);
    document.getElementById("stopwatch").innerText = hrs + ":" + mins + ":" + secs;
    setTimeout(startCount, 1000);
  }
}

// <---stopwatch ends--->

// <---clock--->
function showClock() {
  resetStopwatch();
  startClock();

  document.getElementById("stopwatch").style.display = "none";
  document.getElementById("clock").style.display = "block";
  document.getElementById("clock-btn").classList.add("active");
  document.getElementById("stopwatch-btn").classList.remove("active");
  document.getElementById("start-btn").setAttribute("disabled", "");
  document.getElementById("stop-btn").setAttribute("disabled", "");
  document.getElementById("reset-btn").setAttribute("disabled", "");


}
function startClock() {
  let date = new Date();
  let time = formatTime(date);

  document.getElementById("clock").innerHTML = time;
  setInterval(startClock, 1000);
}

function formatTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  if (hours < 12) {
    return checkNumber(hours) + ":" + checkNumber(minutes) + ":" + checkNumber(seconds) + " AM";
  }
  else if (hours > 12) {
    return checkNumber(hours - 12) + ":" + checkNumber(minutes) + ":" + checkNumber(seconds) + " PM";
  }
  return hours + ":" + checkNumber(minutes) + ":" + checkNumber(seconds) + " PM";
}
function checkNumber(digit) {
  if (digit < 10) {
    return "0" + digit;
  }
  return digit;
}
// <---clock ends--->
