import './App.css';
import { useState } from 'react'
// import { apikey, url } from './shared/urls';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import Sketchy from './components/Sketch';
import LyricGetterForm from './components/LyricGetter';
import { AppContext } from './context';


// use react-bootstrap for making page mobile friendly (remem this is where its really useful)
export default function App() {

  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');



  const dispatchLyricEvent = (actionType, payload) => {
    switch (actionType) {
      case 'GET_LYRICS':
        setLyrics(payload);
        console.log(payload)
        // need to clear lyrics afterwards too to make room for a new set
        return;
      // case 'SET_ERROR':
      //   setError(payload.error);
      //   return;
      default:
        return;
    }
  };


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
      <AppContext.Provider value={{ lyrics, dispatchLyricEvent }}>
        <header >
          <h1>This is the header </h1>
        </header>
        <body>
          {projectExplanation()}
          <LyricGetterForm />
          <div>
            <Sketchy />
          </div>
        </body>
      </AppContext.Provider>
    </div>
  );
}

// 
// musixmatch expects a tracking thing in here that i need to add