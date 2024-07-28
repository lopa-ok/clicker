let count = 0;
let plusCount = 0;
let clickValue = 1;
const countEl = document.getElementById('count');
const button = document.getElementById('activate');
const gboySound = document.getElementById('gboy-sound');
const plusCountEl = document.getElementById('plus-count');
const upgrade1 = document.getElementById('upgrade1');
const upgrade2 = document.getElementById('upgrade2');
const upgrade3 = document.getElementById('upgrade3');
const upgrade4 = document.getElementById('upgrade4');

button.addEventListener('click', () => {
    const randomChance = Math.random();
    let increment;
    let isRng100 = false;

    if (randomChance < 0.1) {
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
});

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
        plusCountEl.innerText = `RNG +100 clicks`;
        plusCountEl.classList.add('purple');
    } else {
        plusCountEl.innerText = `+${plusCount}`;
        plusCountEl.classList.remove('purple');
    }
    
    plusCountEl.classList.remove('hidden');
    plusCountEl.classList.add('visible');

    clearTimeout(window.plusCountTimeout);
    window.plusCountTimeout = setTimeout(() => {
        plusCountEl.classList.remove('visible');
        plusCountEl.classList.add('hidden');

        if (!isRng100) {
            
            plusCountEl.innerText = `+${plusCount}`;
            plusCountEl.classList.remove('hidden');
            plusCountEl.classList.add('visible');
            setTimeout(() => {
                plusCountEl.classList.remove('visible');
                plusCountEl.classList.add('hidden');
            }, 1000);
        }

        plusCount = 0;
    }, 1000);
}
