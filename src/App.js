// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import './App.css';
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Collapse, Container, Button } from 'react-bootstrap';
import TextShuffle from './sketches/TextShuffle';
import MusicGetterForm from './components/MusicGetter';
import SpotifyPlaylistsList from './components/SpotifyPlaylistsList';
import { AppContext } from './context';
import Anagram from './sketches/Anagram';
import Sketch3 from './sketches/Sketch3';
import Graph from './sketches/Graph';
import SpotifySketch2 from './sketches/SpotifySketch2';
import SpotifySketch3 from './sketches/SpotifySketch3';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingComponent from './components/LoadingComponent';

export default function App() {

  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');
  const [canvas, setCanvas] = useState('');
  const [allPlaylists, setAllPlaylists] = useState('');
  const [tracks, setTracks] = useState('');
  const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false);
  const [playlistsorLyrics, setPlaylistsorLyrics] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  // const [tokenType, setTokenType] = useState('');
  const [valOfGraphSketch, setValOfGraphSketch] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copyright, setCopyright] = useState('');
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // proj explanation expand
  const handleResize = e => setWidth(window.innerWidth);
  useEffect(() => window.addEventListener('resize', handleResize));


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
      case 'SET_TRACKS':
        setTracks(payload)
        return
      case 'IS_SPOTIFY_LOGGED_IN':
        setIsSpotifyLoggedIn(payload)
        return
      case 'SET_P_OR_L':
        setPlaylistsorLyrics(payload)
        return
      case 'SET_ACCESS_TOKEN':
        setAccessToken(payload);
        return
      case 'SET_EXPIRES_IN'://I don't think I use these 2 vals??
        setExpiresIn(payload);
        triggerCountDown();
        return
      // case 'SET_TOKEN_TYPE':
      //   setTokenType(payload);
      //   return
      case 'SET_VAL_OF_GRAPH_SKETCH':
        setValOfGraphSketch(payload);
        return
      case 'SET_PLAYLIST_NAME':
        setPlaylistName(payload)
        return
      case 'RESET_VALUES':
        reset(payload)
        return
      case 'LOADING':
        setIsLoading(payload)
        return
      case 'SET_COPYRIGHT':
        setCopyright(payload)
        return
      default:
        return;
    }
  };

  const dispatchError = (actionType, payload) => {
    return <p>this doesnt do anything anymore</p>
    // switch (actionType) {
    //   case 'SET_ERROR':
    // console.log(typeof payload);
    //     setError(payload);
    //     return;
    //   default:
    //     return;
    // }
  };


  const reset = (val) => {
    // console.log(valS)
    if (val === 'lyrics') {
      // setCanvas('');
      setAllPlaylists('');
      setTracks('');
      setIsSpotifyLoggedIn(false);
      setValOfGraphSketch('');
      setPlaylistName('');

    } else {
      setLyrics('');
      // const [error, setError] = useState('');
      // setCanvas('');
    }
  }

  const triggerCountDown = () => {
    setTimeout(() => {
      console.log("spotify access url being cleared")
      alert("Spotify access url being cleared, please log back in.")
      removeHash()
      window.location.reload(true);
    }, 3600000);

  }

  function removeHash() {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  }


  const SelectedCanvas = () => { //add canvases for the playlists
    // console.log(canvas)
    // return (
    //   playlistsorLyrics === 'lyrics' ? canvas === "lyricsA" ?
    //     <TextShuffle />
    //     : canvas === "lyricsB" ?
    //       <Anagram />
    //       : canvas === "lyricsC" ?
    //         <Sketch3 />
    //         : <p>Please select a canvas</p>
    // )
    if (playlistsorLyrics === 'lyrics') {
      return (
        canvas === "lyricsA" ?
          <TextShuffle />
          : canvas === "lyricsB" ?
            <Anagram />
            : canvas === "lyricsC" ?
              <Sketch3 />
              : null
      )
    } else if (playlistsorLyrics === 'playlists') {
      return (
        canvas === "graph" ?
          <Graph />
          : canvas === "b" ?
            <SpotifySketch2 />
            : canvas === "c" ?
              <SpotifySketch3 />
              : null
      )
    } else return <p>Please select a canvas</p>
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
  // console.log(tracks ? (tracks) : null);

  const Music = () => {
    if (error) {
      console.log(error)
      return <p>Some error {error}</p>
    } else if (!error) {
      if (isLoading) {
        return <LoadingComponent />
      }
      else if (lyrics && !allPlaylists) {
        return <Container>
          <SelectedCanvas />
          {/* set this apart somehow */}
          {copyright ? copyright : null}
        </Container>
      } else if (allPlaylists && tracks === '' && playlistsorLyrics !== 'lyrics') return <SpotifyPlaylistsList />
      else if (tracks) {
        return <Container>
          <h4 className="playlistTitle">{playlistName}</h4>
          <SelectedCanvas />
          {valOfGraphSketch ? <p>{valOfGraphSketchExplanation()}</p> : null}
        </Container>
      }
      else return null
    }
  }

  const valOfGraphSketchExplanation = () => {
    if (valOfGraphSketch === 'acousticness') return valOfGraphSketch.toUpperCase() + ': A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.'
    else if (valOfGraphSketch === 'danceability') return valOfGraphSketch.toUpperCase() + ': Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.'
    else if (valOfGraphSketch === 'energy') return valOfGraphSketch.toUpperCase() + ': Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.'
    else if (valOfGraphSketch === 'instrumentalness') return valOfGraphSketch.toUpperCase() + ': Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.'
    else if (valOfGraphSketch === 'liveness') return valOfGraphSketch.toUpperCase() + ': Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.'
    else if (valOfGraphSketch === 'loudness') return valOfGraphSketch.toUpperCase() + ': (Values represented are negative) The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.'
    else if (valOfGraphSketch === 'mode') return valOfGraphSketch.toUpperCase() + ': Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.'
    else if (valOfGraphSketch === 'speechiness') return valOfGraphSketch.toUpperCase() + ': Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33most likely represent music and other non-speech-like tracks.'
    else if (valOfGraphSketch === 'tempo') return valOfGraphSketch.toUpperCase() + ': The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.'
    else if (valOfGraphSketch === 'valence') return valOfGraphSketch.toUpperCase() + ': A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
    // else if (valOfGraphSketch === '') return 

  }
  

  function ProjectExplanation() {
    return (
      <Container className="explanContainer">
        <h4 className="explanHeader">What is this project about?</h4>
        {width <= 768 ? <Container>
          <Button
            // className='d-none .d-lg-block .d-xl-none' //so we cant see the btn at this pt
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Expand
          </Button>
          <Collapse in={open}>
            <p> When I was in school studying literature, we did a very special project in my 20th C lit class. Using the texts we'd read throughout the quarter, we were tasked to make some artistic rendering of them. I honestly can't remember what I made -- I didn't consider myself very artistic at the time. Now, I wished I'd had access to tools like P5.js and coding. This project is inspired by that, by my love of music and reading, and by Rodez's inability to memorize any song ever. I hope you enjoy it as much as I did.
            </p>
          </Collapse>
        </Container> 
        : <p> When I was in school studying literature, we did a very special project in my 20th C lit class. Using the texts we'd read throughout the quarter, we were tasked to make some artistic rendering of them. I honestly can't remember what I made -- I didn't consider myself very artistic at the time. Now, I wished I'd had access to tools like P5.js and coding. This project is inspired by that, by my love of music and reading, and by Rodez's inability to memorize any song ever. I hope you enjoy it as much as I did.</p>}
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
      <ErrorBoundary>
        <AppContext.Provider value={{ lyrics, canvas, allPlaylists, tracks, error, isSpotifyLoggedIn, playlistsorLyrics, accessToken, valOfGraphSketch, isLoading, dispatchSongEvent, dispatchError }}>
          <header>
            <h1 className="appHeader">Music API </h1>
          </header>
          <body className='background' className="border border-success">
            <ProjectExplanation />
            <MusicGetterForm />
            <Music />
          </body>
        </AppContext.Provider>
      </ErrorBoundary>
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