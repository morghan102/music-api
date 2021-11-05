import React, { useContext, useEffect, useState } from 'react';
import Sketch from "react-p5";
import { AppContext } from '../context';

export default function TextShuffle() {
    const { lyrics } = useContext(AppContext);
    const lyricsInLines = lyrics.split(/[\r\n]+/);

    // this is how i resize the canvas
    const [p5, setP5] = useState();
    let width = window.innerWidth, height = window.innerHeight;
    useEffect(() => {
        window.addEventListener("resize", windowResized);
        return () => window.removeEventListener("resize", windowResized);
    }, []);
    function windowResized() {
        if (p5) {
            p5.resizeCanvas(width / 3, height / 1.5);
        }
    }

    const setup = (p5, canvasParentRef) => {
        setP5(p5)
        p5.createCanvas(width / 3.5, height / 1.6).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.background(50);
        p5.textSize(15);

        for (let i = 0; i < lyricsInLines.length; i++) {
            p5.fill(128 + (i * 10))
            p5.text(lyricsInLines[i], 10, height / 22 + i * 25) //22 is about 50px from ea other/the top (at fullscreen), 25 allows enough space between ea other
        }
    };
    function mousePressed(p5) {
        p5.shuffle(lyricsInLines, true);
    }



    return (
        <div>
            <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
            <p className="lyrics">{lyrics}</p>
        </div>
    );
};//cant get the height to resize. It remains the same even if window is resized. scrollbar appears.