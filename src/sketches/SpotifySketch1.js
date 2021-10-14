import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Sketch from "react-p5";
import { AppContext } from '../context';

// ref https://p5js.org/examples/typography-letters.html
//take the lyrics, just the letters all together, highlight some and not others to... make a new word? dunno how to doy
// or just random letters?
export default function SpotifySketch1() {
    const { tracks } = useContext(AppContext);
    // const lyricArr = lyrics.toLowerCase().replaceAll(" ", "").replace(/\s+/, "").split(""); //splits on spaces and line breaks

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(1000, 600).parent(canvasParentRef);
        // p5.textFont(font);
        // p5.textSize(20);
        // p5.textAlign(p5.CENTER, p5.CENTER);
    };

    const draw = (p5) => {
        p5.background(50);
    //     // p5.textSize(16);
    //     let gap = 52;
    //     let margin = 10;
    //     p5.translate(margin * 4, margin * 4);

    //     let counter = 0;
    //     for (let y = 0; y < p5.height - gap; y += gap) {
    //         for (let x = 0; x < p5.width - gap; x += gap) {
    //             // Use the counter to retrieve individual letters by their Unicode number
    //             let lett = lyricArr[counter];
    //             // console.log(lett)

    //             // Add different color to the vowels and other characters
    //             if ( //would be nice to do a poem or something.
    //                 // I wonder if it's possible to bring in a poem api or something and have it find the words from that poem?
    //                 lett === 'a' ||
    //                 lett === 'r' ||
    //                 lett === 't' 
    //                 // lett === 'o' ||
    //                 // lett === 'u'
    //             ) {
    //                 p5.fill('#ed225d');
    //             } else {
    //                 p5.fill(255);
    //             }
    //             // Draw the lett to the screen
    //             p5.text(lett, x, y);
    //             counter++;
    //         }
    //     }
    };


    return (
        <Container>
            <Sketch setup={setup} draw={draw} />
            <p className="lyrics">hi</p>
        </Container>
    );
};

