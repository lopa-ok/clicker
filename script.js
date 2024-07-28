let count = 0;
let plusCount = 0;
let clickValue = 1;
let playerName = '';

const countEl = document.getElementById('count');
const button = document.getElementById('activate');
const gboySound = document.getElementById('gboy-sound');
const plusCountEl = document.getElementById('plus-count');
const upgrade1 = document.getElementById('upgrade1');
const upgrade2 = document.getElementById('upgrade2');
const upgrade3 = document.getElementById('upgrade3');
const upgrade4 = document.getElementById('upgrade4');
const leaderboardEl = document.getElementById('leaderboard');

// Ask for player's name when the page loads
function askForPlayerName() {
    playerName = prompt('Enter your name:') || 'Player';
    updateLeaderboard();
}


button.addEventListener('click', () => {
    const randomChance = Math.random();
    let increment;
    let isRng100 = false;

    if (randomChance < 0.001) {
        gboySound.play();
        increment = 100;
        isRng100 = true;
    } else {
        increment = clickValue;
    }

    count += increment;
    plusCount += increment;
    showPlusCount(isRng100);
    countEl.innerText = count;

    updateLeaderboard();
});

// Handle upgrade clicks
upgrade1.addEventListener('click', () => {
    if (count >= 50) {
        count -= 50;
        clickValue += 1;
        countEl.innerText = count;
        upgrade1.disabled = true;
    }
});

upgrade2.addEventListener('click', () => {
    if (count >= 200) {
        count -= 200;
        clickValue += 5;
        countEl.innerText = count;
        upgrade2.disabled = true;
    }
});

upgrade3.addEventListener('click', () => {
    if (count >= 500) {
        count -= 500;
        clickValue += 10;
        countEl.innerText = count;
        upgrade3.disabled = true;
    }
});

upgrade4.addEventListener('click', () => {
    if (count >= 1000) {
        count -= 1000;
        clickValue += 20;
        countEl.innerText = count;
        upgrade4.disabled = true;
    }
});

function showPlusCount(isRng100) {
    if (isRng100) {
        plusCountEl.innerText = 'RNG +100 clicks';
        plusCountEl.classList.add('purple');
    } else {
        plusCountEl.innerText = `+${plusCount}`;
        plusCountEl.classList.remove('purple');
    }

    plusCountEl.classList.remove('hidden');
    plusCountEl.classList.add('visible');

    setTimeout(() => {
        plusCountEl.classList.remove('visible');
        setTimeout(() => {
            if (!isRng100) {
                plusCountEl.innerText = `+${clickValue}`;
                plusCountEl.classList.add('visible');
            } else {
                plusCountEl.classList.add('hidden');
            }
            plusCount = 0;
        }, 1000);
    }, 1000);
}

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Find the entry for the current player or create a new one
    const existingEntry = leaderboard.find(entry => entry.name === playerName);
    if (existingEntry) {
        existingEntry.score = count;
    } else {
        leaderboard.push({ name: playerName, score: count });
    }

    // Sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Save the updated leaderboard to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardEl.innerHTML = '';

    leaderboard.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerText = `${entry.name}: ${entry.score}`;
        leaderboardEl.appendChild(listItem);
    });
}

// Initialize the game by asking for player's name
askForPlayerName();
