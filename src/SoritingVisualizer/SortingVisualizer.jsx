import React from "react";
import './SortingVisualizer.css'
import { getMergeSortAnimations } from "./sortingAlgorithms.js";

//change this val for speed of animations in milliseconds
const ANIMATION_SPEED = 3;
const NUM_OF_ARRAY_BARS = 310;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = []
        for (let i = 0; i < 200; i++) {
            array.push(randomIntFromInterval(5, 600))
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array)
        
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar')
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turqoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED)
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED)
            }
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                <button onClick={() => this.resetArray()}>Generate new array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                {array.map((value, index) => (
                    <div className="array-bar" key={index} style={{height: `${value}px`}}>
                    </div>
                ))}
            </div>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}