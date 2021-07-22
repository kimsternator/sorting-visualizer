function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

export const insertionSort = array => {
    let animations = [];
    animations.push([0, []]);

    for (let i = 1; i < array.length; i++) {
        let animation = []
        let temp = array[i], j = i - 1;

        while (j >= 0 && array[j] > temp) {
            animation.push([j, j + 1]);
            array[j + 1] = array[j];
            j -= 1;
        }

        array[j + 1] = temp;
        animations.push([i, animation]);
    }

    return animations;
}

export const selectionSort = array => {
    let animations = [], len = array.length;

    for (let i = 0; i < len - 1; i++) {
        let minIdx = i, j = 0;
        let animation = [];

        for (j = i + 1; j < len; j++) {
            animation.push([j, minIdx]);

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        animations.push([i, minIdx, animation]);

        swap(array, i, minIdx);
    }

    return animations;
}

export const bubbleSort = array => {
    let animations = [], len = array.length;

    for (let i = 0; i < len-1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            animations.push([j, j + 1, 0]);

            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);

                animations.push([j, j + 1, 1])
            }
        }
    }

    console.log(array);

    return animations;
}

export const quickSort = array => {
    let animations = [];
    quickHelper(array, 0, array.length - 1, animations);

    return animations;
}

function partition(arr, left, right, animations) {
    let pivot = arr[right];
    let leftWall = left - 1

    for (let i = left; i < right; i++) {
        if (arr[i] < pivot) {
            leftWall++;
            animations.push([leftWall, i]);
            swap(arr, leftWall, i);
        }
    }

    animations.push([leftWall + 1, right]);
    swap(arr, leftWall + 1, right);

    return leftWall + 1;
}

function quickHelper(arr, left, right, animations) {
    if (left < right) {
        let pivotIdx = partition(arr, left, right, animations);
        quickHelper(arr, left, pivotIdx - 1, animations);
        quickHelper(arr, pivotIdx + 1, right, animations);
    }

    return animations;
}

function heapify(array, n, i, animations) {
    let left = 2 * i + 1, right = 2 * i + 2;
    let max = i;

    if (left < n && array[max] < array[left]) {
        max = left;
    }

    if (right < n && array[max] < array[right]) {
        max = right;
    }

    if (max !== i) {
        animations.push([i, max]);
        swap(array, i, max);
        heapify(array, n, max, animations);
    }
}

export const heapSort = array => {
    let animations = [];
    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    for (let i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        animations.push([0, i]);
        heapify(array, i, 0, animations);
    }

    return animations;
}

function merge(array, left, mid, right, animations) {
    let i = left, m = mid, j = mid + 1;

    if (array[mid] <= array[j]) {
        return;
    }

    while (i <= m && j <= right) {
        if (array[i] <= array[j]) {
            i++;
        } else {
            let temp = array[j];
            let idx = j;

            while (idx !== i) {
                animations.push([idx - 1, idx])
                array[idx] = array[idx - 1];
                idx--;
            }

            array[i] = temp;
            i++;
            m++;
            j++;
        }
    }
}

function mergeSortHelper(array, left, right, animations) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);

        mergeSortHelper(array, left, mid, animations);
        mergeSortHelper(array, mid + 1, right, animations);

        merge(array, left, mid, right, animations);
    }
}

export const mergeSort = array => {
    let animations = [];

    mergeSortHelper(array, 0, array.length - 1, animations);

    return animations;
}

function getDigits(num) {
    let temp = num;
    let digits = 0;

    while (temp > 0) {
        digits++;
        temp = Math.floor(temp / 10);
    }

    return digits;
}

function getLargestVal(array) {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    return max;
}

export const countingSort = array => {
    let output = new Array(array.length);
    let count = new Array(256).fill(0);

    for (let i = 0; i < array.length; i++)
        count[array[i]]++;

    for (let i = 1; i <= 255; i++)
        count[i] += count[i - 1];

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    for (let i = 0; i < array.length; i++)
        array[i] = output[i];

    return array;
}

function sortByDigit(digit, array, animations) {
    let output = new Array(array.length);
    let count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[Math.floor(array[i] / Math.pow(10, digit - 1)) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[Math.floor(array[i] / Math.pow(10, digit - 1)) % 10] - 1] = array[i];
        count[Math.floor(array[i] / Math.pow(10, digit - 1)) % 10]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }

    animations.push(array);
}

export const radixSort = array => {
    let animations = [];
    let numDigits = getDigits(getLargestVal(array));

    for (let i = 1; i <= numDigits; i++) {
        sortByDigit(i, array, animations);
    }

    return animations;
}