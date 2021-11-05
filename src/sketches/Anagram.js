import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Sketch from "react-p5";
import { AppContext } from '../context';

// ref https://p5js.org/examples/typography-letters.html
export default function Anagram() {
    const { lyrics } = useContext(AppContext);
    const lyricArr = lyrics.toLowerCase().replaceAll(" ", "").replace(/\s+/, "").split(""); //splits on spaces and line breaks

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 600).parent(canvasParentRef);
        p5.textSize(20);
        p5.textAlign(p5.CENTER, p5.CENTER);
    };

    const draw = (p5) => {
        p5.background(50);
        let gap = 52;
        let margin = 10;
        p5.translate(margin * 4, margin * 4);

        let counter = 0;
        for (let y = 0; y < p5.height - gap; y += gap) {
            for (let x = 0; x < p5.width - gap; x += gap) {
                // Use the counter to retrieve individual letters by their Unicode number
                let lett = lyricArr[counter];

                // Add different color to the vowels and other characters
                if ( //would be nice to do a poem or something.
                    // I wonder if it's possible to bring in a poem api or something and have it find the words from that poem?
                    lett === 'a' ||
                    lett === 'r' ||
                    lett === 't' 
                    // lett === 'o' ||
                    // lett === 'u'
                ) {
                    p5.fill('#ed225d');
                } else {
                    p5.fill(255);
                }
                p5.text(lett, x, y);
                counter++;
            }
        }
    };


    return (
        <Container>
            <Sketch setup={setup} draw={draw} />
            <p className="lyrics">{lyrics}</p>
        </Container>
    );
};
