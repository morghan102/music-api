import './App.css';
import { useEffect, useState } from 'react'
import { apikey, url } from './urls';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Button, Col, Container, Row, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { Label } from 'reactstrap';
import Sketchy from './sketch';


// use react-bootstrap for making page mobile friendly (remem this is where its really useful)
export default function App() {
  const [lyrics, setLyrics] = useState('');
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');


  const getLyrics = async () => {
    try { //not sure if this is being used correctly here
      const res = await fetch(`${url}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${apikey}`);
      const data = await res.json(); //i might be able to desctructure this to get to the lyrics_body
      const almostThere = data.message.body.lyrics.lyrics_body;
      setLyrics(almostThere.substring(0, almostThere.length - 69))
      console.log(lyrics)
    } catch (err) {
      alert(err)
    }
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


  function MusicForm() {
    return (
      // <Container fluid>
      <Form>
        <Row className="justify-content-sm-center">
          <Col sm="auto">
            <Label>
              Song title:
              <input
                type="text"
                value={song}
                onChange={e => setSong(e.target.value)} //e is this whole big object
              />
            </Label>
          </Col>
          {/* break here */}
          <Col sm="auto">
            <Label>
              Artist:
              <input
                type="text"
                value={artist}
                onChange={e => setArtist(e.target.value)}
              />
            </Label>
          </Col>
          <Col sm="auto">
            <Form.Select>
              <option value="0">Select preferred way of displaying the data</option>
              <option value="1">1st way of displaying the data</option>
              <option value="2">2nd way of displaying the data</option>
              <option value="3">3rd way of displaying the data</option>
            </Form.Select>
          </Col>
        </Row>
        <Button onClick={getLyrics}>Get Those Lyrics</Button> {/* this will handle submission of the music form */}

        {/* <input type="submit" value="Submit" /> replace(" ", '%20') */}
      </Form>
      // </Container>
    )
  }


  const dropDowns = () => {
    return (
      <Container>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button" variant='info'>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </Container>
    );
  }

  return (
    <div className="App">
      <header >
        <h1>This is the header </h1>
      </header>
      <body>
        {projectExplanation()}
        {MusicForm()}
        <p>{lyrics}</p>
        {console.log(Sketchy)}
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