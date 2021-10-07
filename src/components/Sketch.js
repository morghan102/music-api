import React, { useContext } from 'react';
import Sketch from "react-p5";
import { AppContext } from '../context';

let x = 50;
let y = 50;
export default function Sketchy() {
    const { lyrics } = useContext(AppContext); //ERROR HANDLING

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(500, 500).parent(canvasParentRef);

    };

    const draw = (p5) => {
        p5.background(0);
        p5.ellipse(-x, -y, 70, 70);
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        // console.log(x, y)
        x--;
        y--;
    };

    return (
        <div>
            <Sketch setup={setup} draw={draw} />
            <p>{lyrics}</p>
        </div>
    );
};