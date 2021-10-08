import React, { useContext } from 'react';
import Sketch from "react-p5";
import { AppContext } from '../context';


export default function Sketch3() {
    const { lyrics } = useContext(AppContext);
    const lyricArr = lyrics.split(/\s+/); //splits on spaces and line breaks
    let cnv;

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        cnv = p5.createCanvas(500, 600).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background(50);
        p5.textSize(16);


    };


    return (
        <div>
            <Sketch setup={setup} draw={draw} />
            <p className="displayedLyr">{lyrics}</p>
        </div>
    );
};
