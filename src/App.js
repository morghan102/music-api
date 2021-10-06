import './App.css';
import { useEffect, useState } from 'react'
import { apikey, url } from './shared/urls';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import Sketchy from './components/Sketch';
import LyricGetterForm, {lyrics} from './components/LyricGetter';


// use react-bootstrap for making page mobile friendly (remem this is where its really useful)
export default function App() {

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

  // const useInput = initialValue => { //this is a custom hook found here https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
  //   const [val, setVal] = useState(initialValue); 

  //   return {
  //     val,
  //     setVal,
  //     reset: () => setVal(""),
  //     bind: {
  //       val,
  //       onChange: event => {
  //         setVal(event.target.value); //that might need to be val instead of value
  //       }
  //     }
  //   };
  // };

  return (
    <div className="App">
      <header >
        <h1>This is the header </h1>
      </header>
      <body>
        {projectExplanation()}
        <LyricGetterForm />
        <p>{console.log(LyricGetterForm)}</p>
        <div>
          <Sketchy />
        </div>
        {/* <rect x="0" y="0" width="300" height="200"></rect> */}
      </body>
    </div>
  );
}

// 
// musixmatch expects a tracking thing in here that i need to add