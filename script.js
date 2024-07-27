let count = 0;
        const countEl = document.getElementById('count');
        const button = document.getElementById('activate');

        button.addEventListener('click', () => {
            count++;
            countEl.innerText = count;
        });