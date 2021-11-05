import React, { useContext } from 'react';
import Sketch from "react-p5";
import { AppContext } from '../context';

export default function TextShuffle() {
    const { lyrics } = useContext(AppContext);
    const lyricsInLines = lyrics.split(/[\r\n]+/);

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 600).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background(50);
        p5.textSize(16);

        for (let i = 0; i < lyricsInLines.length; i++) {
            p5.fill(128 + (i * 10))
            p5.text(lyricsInLines[i], 50, 50 + i * 20)
        }
    };
    function mousePressed(p5, event) {
        p5.shuffle(lyricsInLines, true);
    }

    return (
        <div>
            <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
            <p className="lyrics">{lyrics}</p>
        </div>
    );
};