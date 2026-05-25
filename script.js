let comparisons = 0;

let swaps = 0;
let array = [];

let delay = 80;

let stopSorting = false;

const container = document.getElementById("array-container");

const speedRange = document.getElementById("speedRange");

speedRange.addEventListener("input", function () {

    delay = 320 - parseInt(speedRange.value);

});
function updateStats(){

    document.getElementById("comparisons").innerText =
        comparisons;

    document.getElementById("swaps").innerText =
        swaps;
}
function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

function generateArray() {

    stopSorting = false;
comparisons = 0;

swaps = 0;

updateStats();
    array = [];

    container.innerHTML = "";

    for (let i = 0; i < 30; i++) {

        let value = Math.floor(Math.random() * 300) + 20;

        array.push(value);

        let bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value + "px";

        container.appendChild(bar);
    }
}

function resetArray() {

    generateArray();

    document.getElementById("algo-name").innerText = "Algorithm Info";

    document.getElementById("algo-info").innerText =
        "Select an algorithm to visualize.";
}

function pauseSorting() {

    stopSorting = true;
}

async function bubbleSort() {

    document.getElementById("algo-name").innerText = "Bubble Sort";

    document.getElementById("algo-info").innerText =
        "Bubble Sort repeatedly swaps adjacent elements if they are in wrong order. Time Complexity : O(n²)";

    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            if (stopSorting) return;

            bars[j].classList.add("active");

            bars[j + 1].classList.add("active");

            await sleep(delay);
comparisons++;

updateStats();
            if (array[j] > array[j + 1]) {
swaps++;

updateStats();
                let temp = array[j];

                array[j] = array[j + 1];

                array[j + 1] = temp;

                bars[j].style.height = array[j] + "px";

                bars[j + 1].style.height = array[j + 1] + "px";
            }

            bars[j].classList.remove("active");

            bars[j + 1].classList.remove("active");
        }

        bars[array.length - i - 1].classList.add("sorted");
    }
}

async function selectionSort() {

    document.getElementById("algo-name").innerText = "Selection Sort";

    document.getElementById("algo-info").innerText =
        "Selection Sort repeatedly selects minimum element and places it correctly. Time Complexity : O(n²)";

    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {

        let minIndex = i;

        bars[minIndex].classList.add("active");

        for (let j = i + 1; j < array.length; j++) {

            if (stopSorting) return;

            bars[j].classList.add("searching");

            await sleep(delay);

            if (array[j] < array[minIndex]) {

                bars[minIndex].classList.remove("active");

                minIndex = j;

                bars[minIndex].classList.add("active");
            }

            bars[j].classList.remove("searching");
        }

        let temp = array[i];

        array[i] = array[minIndex];

        array[minIndex] = temp;

        bars[i].style.height = array[i] + "px";

        bars[minIndex].style.height = array[minIndex] + "px";

        bars[i].classList.add("sorted");
    }
}

async function mergeSort(start, end) {

    if (start >= end || stopSorting) return;

    let mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid);

    await mergeSort(mid + 1, end);

    await merge(start, mid, end);
}

async function merge(start, mid, end) {

    let left = array.slice(start, mid + 1);

    let right = array.slice(mid + 1, end + 1);

    let bars = document.getElementsByClassName("bar");

    let i = 0;

    let j = 0;

    let k = start;

    while (i < left.length && j < right.length) {

        if (stopSorting) return;

        await sleep(delay);

        if (left[i] <= right[j]) {

            array[k] = left[i];

            i++;
        }

        else {

            array[k] = right[j];

            j++;
        }

        bars[k].style.height = array[k] + "px";

        bars[k].classList.add("active");

        k++;
    }

    while (i < left.length) {

        array[k] = left[i];

        bars[k].style.height = array[k] + "px";

        i++;

        k++;
    }

    while (j < right.length) {

        array[k] = right[j];

        bars[k].style.height = array[k] + "px";

        j++;

        k++;
    }
}

async function mergeSortStart() {

    document.getElementById("algo-name").innerText = "Merge Sort";

    document.getElementById("algo-info").innerText =
        "Merge Sort uses divide and conquer approach. Time Complexity : O(n log n)";

    await mergeSort(0, array.length - 1);

    let bars = document.getElementsByClassName("bar");

    for (let bar of bars) {

        bar.classList.add("sorted");
    }
}

async function binarySearch() {

    document.getElementById("algo-name").innerText = "Binary Search";

    document.getElementById("algo-info").innerText =
        "Binary Search works only on sorted arrays. Time Complexity : O(log n)";

    await bubbleSort();

    let target = array[Math.floor(Math.random() * array.length)];

    let bars = document.getElementsByClassName("bar");

    let left = 0;

    let right = array.length - 1;

    while (left <= right) {

        if (stopSorting) return;

        let mid = Math.floor((left + right) / 2);

        bars[mid].classList.add("searching");

        await sleep(delay * 3);

        if (array[mid] === target) {

            bars[mid].classList.remove("searching");

            bars[mid].classList.add("found");

            return;
        }

        else if (array[mid] < target) {

            left = mid + 1;
        }

        else {

            right = mid - 1;
        }

        bars[mid].classList.remove("searching");
    }
}

generateArray();
function useCustomArray(){

    let input =
        document.getElementById("customArray").value;

    let numbers =
        input.split(" ").map(Number);

    array = numbers;

    container.innerHTML = "";

    for(let value of array){

        let bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value * 3 + "px";

        container.appendChild(bar);
    }
}