import p5 from 'p5';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Sketch from "react-p5";
import { AppContext } from '../context';

export default function Graph() {
    const { tracks, valOfGraphSketch } = useContext(AppContext);
    const valsArr = []

    const getPropValue = (obj, key) => //why does this work while everythng else didnt???????
        key.split('.').reduce((o, x) =>
            o == undefined ? o : o[x]
            , obj)
    // got this from: https://crunchtech.medium.com/object-destructuring-best-practice-in-javascript-9c8794699a0d

    if (valOfGraphSketch && tracks) (tracks.forEach((track) => { //shd be able to let everything go a level up, don't need to get to music info objs
        valsArr.push(getPropValue(track, valOfGraphSketch))
    }));

    const canvasX = 1100, canvasY = 700//, xStart = 0;
    const max = Math.max.apply(Math, valsArr)
    const min = Math.min.apply(Math, valsArr)


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasX, canvasY).parent(canvasParentRef);
        p5.noLoop();
    };

    const median = () => {
        let half = Math.floor(valsArr.length / 2);
        return valsArr.length % 2 === 0 ? valsArr[half] : (valsArr[half] + valsArr[half - 1]) / 2
    }
    // console.log(max)
    // console.log(min)
    // console.log("---------------------")

    const transformVal = (val) => {
        let x = 0;
        if (valOfGraphSketch !== 'loudness' && valOfGraphSketch !== 'mode' && valOfGraphSketch !== 'tempo') x = val * 600
        else if (valOfGraphSketch === 'loudness') x = 10 * -val; //val will be negative. This requires adjusting on part of the numbers on the lines
        else if (valOfGraphSketch === 'mode') x = val * 100; //either 1 or 0
        else if (valOfGraphSketch === 'tempo') x = val * 3;
        // console.log(x)
        return x += 5; //shd this be +=??
    }

    const draw = (p5) => {
        // p5.background(0, 0, 255)
        // p5.background(255);
        p5.fill(0, 0, 0);
        let counter = 1;
        let yCounter = 0;
        let textCounter = 0;
        p5.translate(80, 0)
            let reducer = 0;

        valsArr.forEach((val) => {
            // console.log(val)
            let y = transformVal(val)
            let x = counter * (canvasX / valsArr.length - 1);
            p5.text(yCounter, -30, yCounter)
            // p5.ellipse(x, y - 5, 6) //cd use p5.point //THIS NEEDS TO HAVE THE CENTER BE AT THE VALUE, NOT RIGHT ABOVE/BELOW
            p5.line(x, 600, x, 590)//x axis tick marks
            // p5.line(95, y, 105, y)//y axis tick marks (rn just the y of the vals. after spreading out more evenly, make it regular intervals like x)
            p5.line(-5, yCounter, 5, yCounter)
            counter += 1;
            textCounter += 100;
            if (yCounter <= 500) yCounter += 100;
            reducer += y;
            //         if (p5.mouseX === x && p5.mouseY === y) console.clear()
            p5.strokeWeight(5.5)
            p5.point(x,y)
            p5.strokeWeight(1)
            // console.log(p5.mouseX)
        })
        // console.log(reducer)

        p5.stroke(50);
        p5.line(0, 0, 0, canvasY - 100) //y axis
        p5.line(0, canvasY - 100, canvasX, canvasY - 100) //x axis
        p5.stroke(204,204,204)
        // let middle = transformVal(median())
        p5.line(1, reducer/valsArr.length, canvasX, reducer/valsArr.length) //median line

    };


    return (
        <Container >
            <Sketch setup={setup} draw={draw} />
        </Container>
    );
};
// meybs i can compare diff values/have a dropdown where they can compare these qualities.
// wd be nice in that case to be able to just look at their liked songs and see where they're at
// ------------------------------------------------------------------
// acousticness: A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.

// analysis_url: A URL to access the full audio analysis of this track. An access token is required to access this data.	

// danceability:Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, 
// beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.

// duration_ms: 207813

// energy: Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, 
// loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this 
// attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.

// id: "0LJDFZohBgWOMvXQw0cc9W"

// instrumentalness: Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken 
// word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. 
// Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.

// key: The key the track is in. Integers map to pitches using standard Pitch Class notation . E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.

// liveness: Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed 
// live. A value above 0.8 provides strong likelihood that the track is live.

// loudness: The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative 
// loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical 
// range between -60 and 0 db.

// mode: Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 
// and minor is 0.

// speechiness: Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, 
// poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 
// and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33
//  most likely represent music and other non-speech-like tracks.

// tempo: The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives 
// directly from the average beat duration.

// time_signature: An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are 
// in each bar (or measure).

// track_href: "https://api.spotify.com/v1/tracks/0LJDFZohBgWOMvXQw0cc9W"

// type: "audio_features"

// uri: "spotify:track:0LJDFZohBgWOMvXQw0cc9W"

// valence: A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. 
// happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).