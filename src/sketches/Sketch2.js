import React, { useContext } from 'react';
import Sketch from "react-p5";
import { AppContext } from '../context';


export default function Sketch2() {
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

        // for (let i = 0; i < lyricsInLines.length; i++) {
        //     p5.fill(128 + (i * 10))
        //     p5.text(lyricsInLines[i], 50, 50 + i * 20)
        // }
    };


    return (
        <div>
            <Sketch setup={setup} draw={draw} />
            <p>{lyrics}</p>
        </div>
    );
};
