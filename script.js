let count = 0;
let plusCount = 0;
const countEl = document.getElementById('count');
const button = document.getElementById('activate');
const gboySound = document.getElementById('gboy-sound');
const plusCountEl = document.getElementById('plus-count');

button.addEventListener('click', () => {
    const randomChance = Math.random();
    let increment;
    let isRng100 = false;

    if (randomChance < 0.1) {
        gboySound.play();
        increment = 100;
        isRng100 = true;
    } else {
        increment = 1;
    }

    count += increment;
    plusCount += increment;
    showPlusCount(isRng100);
    countEl.innerText = count;
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
