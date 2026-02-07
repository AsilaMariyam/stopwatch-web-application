/* script.js */

// Values for time conversion
const MS_IN_SEC = 1000;
const MS_IN_MIN = 60 * MS_IN_SEC;
const MS_IN_HOUR = 60 * MS_IN_MIN;

// DOM Elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// State Variables
let startTime;
let elapsedTime = 0;
let timerInterval;

// Helper function to format time
function formatTime(time) {
    let diff = time;

    let hh = Math.floor(diff / MS_IN_HOUR);
    diff -= hh * MS_IN_HOUR;

    let mm = Math.floor(diff / MS_IN_MIN);
    diff -= mm * MS_IN_MIN;

    let ss = Math.floor(diff / MS_IN_SEC);
    diff -= ss * MS_IN_SEC;

    let ms = Math.floor(diff / 10); // Display 2 digits for MS

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

// Function to update display
function printTime() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
}

// Event Listeners
startBtn.addEventListener('click', function () {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(printTime, 10); // Update every 10ms

    // UI Updates
    startBtn.disabled = true;
    startBtn.style.display = 'none'; // Optional: Toggle Start/Pause button visibility pattern, but we have separate buttons

    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
});

pauseBtn.addEventListener('click', function () {
    clearInterval(timerInterval);

    // UI Updates
    startBtn.disabled = false;
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'Resume'; // Change text to Resume

    pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.innerHTML = "00:00:00.00";

    // Clear Laps
    lapsList.innerHTML = '';

    // UI Updates
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    startBtn.style.display = 'inline-block';

    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', function () {
    const li = document.createElement('li');
    const lapNumber = lapsList.children.length + 1;

    li.innerHTML = `
        <span class="lap-number">Lap ${lapNumber}</span>
        <span class="lap-time">${formatTime(elapsedTime)}</span>
    `;

    // Prepend to show latest lap at top
    lapsList.prepend(li);
});
