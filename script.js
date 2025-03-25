'use strict'
const maxVisibleElements = 20;
const newRenderedData = 20;
const itemHeight = 50;
let startIndex = 0;
let endIndex = newRenderedData;
const arr = [];

for (let i = 0; i < 1000; i++) {
    arr.push(`Test data: ${i}`);
}

const virtualListContainer = document.querySelector('.virtualListContainer');
const virtualList = document.querySelector('.virtualList');


function loadSavedState() {
    return JSON.parse(localStorage.getItem('radioState')) || {};
}

function saveState() {
    localStorage.setItem('radioState', JSON.stringify(radioState));
}

let radioState = loadSavedState();

function renderElements() {
    virtualList.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        const listElement = document.createElement('div');
        listElement.classList.add('listElement');
        listElement.textContent = arr[i];

        const radioContainer = document.createElement('div');
        radioContainer.classList.add('radioContainer');
        

        for (let j = 1; j <= 3; j++) {
            const label = document.createElement('label');
            const radioButton = document.createElement('input');

            radioButton.type = "radio";
            radioButton.name = `row_${i}`;
            radioButton.value = `option${j}`;

            if (radioState[`row_${i}`] === `option${j}`) {
                radioButton.checked = true;
            }

            radioButton.addEventListener('change', () => {
                radioState[`row_${i}`] = radioButton.value;
                saveState();
            });
            label.appendChild(radioButton);
            radioContainer.appendChild(label);
        }
        listElement.appendChild(radioContainer);
        listElement.style.top = `${i * itemHeight}px`;
        listElement.style.height = `${itemHeight}px`;
        virtualList.appendChild(listElement);
    }
}

if (virtualListContainer) {
    renderElements();
    virtualListContainer.addEventListener('scroll', () => {
        const scrollPosition = virtualListContainer.scrollTop;
        startIndex = Math.floor(scrollPosition / itemHeight);
        endIndex = startIndex + newRenderedData;
        if (endIndex > arr.length) {
            endIndex = arr.length;
        }
        renderElements();
        console.log(`StartIndex: ${startIndex}, EndIndex: ${endIndex}`);
    });
}
