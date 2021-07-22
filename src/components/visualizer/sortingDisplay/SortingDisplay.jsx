import "./SortingDisplay.scss"
import React, { Component } from "react"
import {
    insertionSort,
    selectionSort,
    bubbleSort,
    quickSort,
    heapSort,
    mergeSort,
    countingSort,
    radixSort
} from "../../sortingAlgorithms/sortingAlgorithms";

let shuffle = require('shuffle-array');

export default class SortingDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.generateNewArray();
    }

    generateNewArray() {
        let array = [];

        for (let i = 1; i <= 100; i++) {
            array.push(i);
        }

        shuffle(array);
        this.setState({array});
    }

    bubbleSort() {
        const animations = bubbleSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const arrayBars = document.getElementsByClassName('array-element');
            const [leftIdx, rightIdx, swap] = animation;
            const leftBar = arrayBars[leftIdx].style;
            const rightBar = arrayBars[rightIdx].style;
            console.log(animation);

            setTimeout(() => {
                leftBar.backgroundColor = "blue";
                rightBar.backgroundColor = "blue";

                setTimeout(() => {
                    if (swap) {
                        const tempHeight = leftBar.height;
                        leftBar.height = rightBar.height;
                        rightBar.height = tempHeight;
                    }

                    leftBar.backgroundColor = "coral";
                    rightBar.backgroundColor = "coral";
                }, 1)

            }, i * 5);
        }
    }

    quickSort() {
        const animations = quickSort(this.state.array);
        console.log(animations);

        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const arrayBars = document.getElementsByClassName('array-element');
            const [left, right] = animation;

            setTimeout(() => {
                const leftBar = arrayBars[left].style;
                const rightBar = arrayBars[right].style;

                const tempHeight = leftBar.height;
                leftBar.height = rightBar.height;
                rightBar.height = tempHeight;
            }, i * 50);
        }
    }

    selectionSort() {
        const animations = selectionSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const arrayBars = document.getElementsByClassName('array-element');
            const [finalOne, finalTwo, comparisons] = animation;

            setTimeout(() => {
                const leftBar = arrayBars[finalOne].style;
                const rightBar = arrayBars[finalTwo].style;

                for (let j = 0; j < comparisons.length; j++) {
                    const comparison = comparisons[j];

                    setTimeout(() => {
                        const leftComp = arrayBars[comparison[0]].style;
                        const rightComp = arrayBars[comparison[1]].style;

                        leftComp.backgroundColor = "blue";
                        rightComp.backgroundColor = "green";

                        setTimeout(() => {
                            leftComp.backgroundColor = "coral";
                            rightComp.backgroundColor = "coral";
                        }, 10)
                    }, j * (500 / comparisons.length + 1))
                }

                setTimeout(() => {
                    const leftBar = arrayBars[animation[0]].style;
                    const rightBar = arrayBars[animation[1]].style;
                    const tempHeight = leftBar.height;
                    leftBar.height = rightBar.height;
                    rightBar.height = tempHeight;
                }, 500);
            }, i * 500);

        }
    }

    insertionSort() {
        const animations = insertionSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const arrayBars = document.getElementsByClassName('array-element');
            const [compareIdx, swaps] = animation;
            const compareBar = arrayBars[compareIdx].style;

            setTimeout(() => {
                compareBar.backgroundColor = "green";

                for (let j = 0; j < swaps.length; j++) {
                    setTimeout(() => {
                        const swap = swaps[j];
                        const leftBar = arrayBars[swap[0]].style;
                        const rightBar = arrayBars[swap[1]].style;
                        const tempHeight = leftBar.height;
                        leftBar.height = rightBar.height;
                        rightBar.height = tempHeight;
                    }, j * (500 / swaps.length))
                }
                setTimeout(() => {
                    compareBar.backgroundColor = "purple";
                }, 500)
            }, i * 500)
        }
    }

    mergeSort() {
        const animations = mergeSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-element');
            const [leftIdx, rightIdx] = animations[i];

            setTimeout(() => {
                const leftBar = arrayBars[leftIdx].style;
                const rightBar = arrayBars[rightIdx].style;

                const tempHeight = leftBar.height;
                leftBar.height = rightBar.height;
                rightBar.height = tempHeight;
            }, i * 50)
        }
    }

    heapSort() {
        const animations = heapSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-element');
            const [leftIdx, rightIdx] = animations[i];

            setTimeout(() => {
                const leftBar = arrayBars[leftIdx].style;
                const rightBar = arrayBars[rightIdx].style;

                const tempHeight = leftBar.height;
                leftBar.height = rightBar.height;
                rightBar.height = tempHeight;
            }, i * 50)
        }
    }

    countingSort() {
        const animations = countingSort(this.state.array);

        const arrayBars = document.getElementsByClassName('array-element');

        for (let j = 0; j < animations.length; j++) {
            arrayBars[j].style.height = `${animations[j] * 4}px`;
        }
    }

    radixSort() {
        const animations = radixSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-element');

            for (let j = 0; j < animations[i].length; j++) {
                arrayBars[j].style.height = `${animations[i][j] * 4}px`;
            }
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="total-container">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-element"
                            key={idx}
                            style={{height: `${value * 4}px`}}
                        />
                    ))}
                </div>
                <div className="algorithms">
                    <button
                        onClick={() => this.bubbleSort()}
                        className="algorithm"
                    >
                        Bubble
                    </button>
                    <button
                        onClick={() => this.quickSort()}
                        className="algorithm"
                    >
                        Quick
                    </button>
                    <button
                        onClick={() => this.selectionSort()}
                        className="algorithm"
                    >
                        Selection
                    </button>
                    <button
                        onClick={() => this.insertionSort()}
                        className="algorithm"
                    >
                        Insertion
                    </button>
                    <button
                        onClick={() => this.mergeSort()}
                        className="algorithm"
                    >
                        Merge
                    </button>
                    <button
                        onClick={() => this.heapSort()}
                        className="algorithm"
                    >
                        Heap
                    </button>
                    <button
                        onClick={() => this.countingSort()}
                        className="algorithm"
                    >
                        Counting
                    </button>
                    <button
                        onClick={() => this.radixSort()}
                        className="algorithm"
                    >
                        Radix
                    </button>
                </div>
                <div className="button-container">
                    <button onClick={() => this.generateNewArray()} >Generate New Array</button>
                </div>
            </div>
        );
    }
}

