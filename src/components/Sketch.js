import React, { useContext } from 'react';
import Sketch from "react-p5";
// import { Context } from '../Store';
import { AppContext } from '../context';

let x = 50;
let y = 50;
export default function Sketchy() {
    // const [state, dispatch] = useContext(Context);
    const { lyrics, error } = useContext(AppContext);

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

    if (error) {
        console.log(error)        
        return <p>Something went wrong: <span>{error}</span></p> //NEED ERROR HANDLING
    } else if (!error && lyrics) {
        console.log(lyrics);
        return <Sketch setup={setup} draw={draw} />;
    } else {
        // console.log(AppContext)
        return <p>Something will show up here</p>;
    }
};