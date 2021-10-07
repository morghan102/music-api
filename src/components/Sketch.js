import React, { useContext } from 'react';
import Sketch from "react-p5";
import { AppContext } from '../context';

let x = 50;
let y = 50;
export default function Sketchy() {
    const { lyrics } = useContext(AppContext);
    const lyricArr = lyrics.split(/\s+/); //splits on spaces and line breaks
    const lyricsInLines = lyrics.split(/[\r\n]+/); //splits on line reaks only


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(500, 600).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background(50);
        p5.textSize(16);

        for (let i = 0; i < lyricsInLines.length; i++) {
            p5.fill(128 + (i * 10))
            p5.text(lyricsInLines[i], 50, 50 + i * 20)
        }
        // (p5.ellipse(-x, -y, 70, 70);
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        // console.log(x, y)
        // x--;
        // y--;)
    };
    function mousePressed(p5) { //is tehre a way to focus this inside the canvas?
        p5.shuffle(lyricsInLines, true);
    }

    return (
        <div>
            <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
            <p>{lyrics}</p>
        </div>
    );
};

// Don’t use setState inside the draw function or in functions called inside the draw function (because the draw function is executed by P5 in an 
// infinite loop).
// Use class properties or variables declared outside your component if you want to store something (instead of the component state).
// If you need the P5 instance used by react-p5 outside your Sketch methods, then you can get it from window.p5.
// Always use .parent(canvasParentRef) method when creating your canvas in the setup. Because without that P5 will render your 
// canvas outside of your component and that can be a problem because react-p5 will lose full control on the rendered canvas.