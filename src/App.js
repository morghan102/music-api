import './App.css';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import TextShuffle from './sketches/TextShuffle';
import LyricGetterForm from './components/LyricGetter';
import { AppContext } from './context';
import Sketch2 from './sketches/Sketch2';
import Sketch3 from './sketches/Sketch3';


export default function App() {

  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');
  const [canvas, setCanvas] = useState('');



  const dispatchLyricEvent = (actionType, payload) => {
    switch (actionType) {
      case 'GET_LYRICS':
        setLyrics(payload);
        // need to clear lyrics afterwards too to make room for a new set
        return;
      case 'SET_CANVAS': //this updates ea time you make a new selection
        setCanvas(payload);
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

  const SelectedCanvas = () => {
    console.log(canvas)
    return (
      canvas === "a" ?
        <TextShuffle />
        : canvas === "b" ?
          <Sketch2 />
          : canvas === "c" ?
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
      <div>
        <div>
          <h3>This is an explanation of what the project is about</h3>
          <p>This is what I'll type in the explanation. Also note that I'm only allowed to use "X" number of lyrics</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ lyrics, canvas, dispatchLyricEvent, dispatchError }}>
        <header >
          <h1>This is the header </h1>
        </header>
        <body>
          {projectExplanation()}
          <LyricGetterForm />
          <div>
            {
              !error && lyrics ?
                <div>
                  <SelectedCanvas />
                  {/* { if (canvas != 0) <p>Explains this specific rendering of the project</p>} this needs to only be rendered if a canvas has been selected*/}
                </div>
                : error ? <p>Some error, can't figure out how to render for the user to see</p>
                  : <p>Nothing yet</p>
            }
          </div>
        </body>
      </AppContext.Provider>
    </div>
  );
}

// 
// musixmatch expects a tracking thing in here that i need to add

// https://medium.com/nerd-for-tech/using-context-api-in-react-with-functional-components-dbc653c7d485