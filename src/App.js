// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import './App.css';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Container } from 'react-bootstrap';
import TextShuffle from './sketches/TextShuffle';
import MusicGetterForm from './components/MusicGetter';
import SpotifyPlaylists from './components/SpotifyPlaylists';
import { AppContext } from './context';
import Anagram from './sketches/Anagram';
import Sketch3 from './sketches/Sketch3';

export default function App() {

  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');
  const [canvas, setCanvas] = useState('');
  const [allPlaylists, setAllPlaylists] = useState('');
  const [playlist, setPlaylist] = useState('');


  const dispatchSongEvent = (actionType, payload) => {
    switch (actionType) {
      case 'GET_LYRICS':
        setLyrics(payload);
        // need to clear lyrics afterwards too to make room for a new set?? i shouldnt need to i think!
        return;
      case 'SET_CANVAS': //this updates ea time you make a new selection
        setCanvas(payload);
        return
      case 'SET_ALL_PLAYLISTS':
        setAllPlaylists(payload);
        return
      case 'SET_PLAYLIST':
        setPlaylist(payload)
        return
      default:
        return;
    }
  };

  const dispatchError = (actionType, payload) => {
    switch (actionType) {
      case 'SET_ERROR':
        console.log(payload);
        setError(payload);
        return;
      default:
        return;
    }
  };

  const SelectedCanvas = () => { //add canvases for the playlists
    console.log(canvas)
    return (
      canvas === "lyricsA" ?
        <TextShuffle />
        : canvas === "lyricsB" ?
          <Anagram />
          : canvas === "lyricsC" ?
            <Sketch3 />
            : <p>Please select a canvas</p>
    )
  }



  // trying to fix the cors error. also reference server.js
  // const [data, setData] = useState('');

  // useEffect(() => {
  //   callBackendAPI()
  //   .then(res => setData(res.express))
  //   .catch(err => console.log(err))    
  // })
  // const callBackendAPI = async() => {
  //   const response = await fetch('/express_backend');
  //   // console.log(response)
  //   const body = await response.json();
  //   const almostThere = data.message.body.lyrics.lyrics_body;
  //   setLyrics(almostThere.substring(0, almostThere.length - 69))
  //   console.log(lyrics)

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return lyrics;
  // }


  function projectExplanation() {
    return (
      <Container>
        <h4>What is this project about?</h4>
        <p> When I was in school studying literature, we did a very special project in my 20th C lit class. Using the texts we'd read throughout the quarter, we were tasked to make some artistic rendering of them. I honestly can't remember what I made -- I didn't consider myself very artistic at the time. Now, I wished I'd had access to tools like P5.js and coding. This project is inspired by that, by my love of music and reading, and by Rodez's inability to memorize any song ever. I hope you enjoy it as much as I did.
          <br /> Unfortunately, due to MusixMatch's restrictions, I can only display a certain number of lyrics.
        </p>
      </Container>
    )
  }

  return (
    // not sure I need router? will decide later 
    // <Router>
    // {/* navbar? I don't think I want that but meybs */}
    // <Switch>
    //   <Route path='/home'>
    <div className="App">
      <AppContext.Provider value={{ lyrics, canvas, allPlaylists, playlist, error, dispatchSongEvent, dispatchError }}>
        <header >
          <h1>Music Expressed Artistically </h1>
        </header>
        <body>
          {projectExplanation()}
          <MusicGetterForm />
          <div>
            {
              !error && lyrics ?
                <Container>
                  <SelectedCanvas />
                  {/* { if (canvas != 0) <p>Explains this specific rendering of the project</p>} this needs to only render if a canvas has been selected*/}
                </Container>
                : error ? <p>Some error, can't figure out how to render for the user to see</p>
                  : !error && allPlaylists ?
                    <SpotifyPlaylists />
                    : <p>Nothing yet</p>
            }
          </div>
        </body>
      </AppContext.Provider>
    </div>
    //   </Route>
    // </Switch>

    //   <Switch>
    //     <Route path='/'>
    //       {/* <Login /> */}
    //       <h1>hi</h1>
    //     </Route>
    //   </Switch>


    // </Router>
  );
}

// 
// musixmatch expects a tracking thing in here that i need to add

// https://medium.com/nerd-for-tech/using-context-api-in-react-with-functional-components-dbc653c7d485