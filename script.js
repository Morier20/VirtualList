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
    console.log(localStorage.getItem('radioState'));
    return JSON.parse(localStorage.getItem('radioState')) || {}; 
}// Load data, if none exist, return an empty object

function saveState() {
    localStorage.setItem('radioState', JSON.stringify(radioState));
} // Save as JSON

let radioState = loadSavedState();

function renderElements() {
    virtualList.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        if(virtualList.childNodes.length<=maxVisibleElements){
            // Check if the number of elements does not exceed the maximum allowed
            const listElement = document.createElement('div');
            listElement.classList.add('listElement');
            listElement.textContent = arr[i]; 

            const radioContainer = document.createElement('div');
            // Container for radio buttons
            radioContainer.classList.add('radioContainer');
        

            for (let j = 1; j <= 3; j++) { 
                const label = document.createElement('label');
                const radioButton = document.createElement('input');

                radioButton.type = "radio";
                radioButton.name = `row_${i}`;
                radioButton.value = `option${j}`;

                if (radioState[`row_${i}`] === `option${j}`) {
                    radioButton.checked = true;
                }// Load saved button states

                radioButton.addEventListener('change', () => {
                    radioState[`row_${i}`] = radioButton.value; 
                    saveState();
                });// Track changes in button states
                label.appendChild(radioButton);
                radioContainer.appendChild(label);
        }
        listElement.appendChild(radioContainer);
        listElement.style.top = `${i * itemHeight}px`;
        listElement.style.height = `${itemHeight}px`;
        virtualList.appendChild(listElement);
        }
        else{
            return;
        }
    }
}
if (virtualListContainer) {
    renderElements();
    virtualListContainer.addEventListener('scroll', () => {
        const scrollPosition = virtualListContainer.scrollTop;
        startIndex = Math.floor(scrollPosition / itemHeight);
        // Calculate the new start position (index in test data array) based on scroll depth and item height
        endIndex = startIndex + newRenderedData;
        //New end position (index in test data array)
        if (endIndex > arr.length) {
            endIndex = arr.length;
        }// Ensure the end index does not exceed the array limit
        renderElements();
    });
}