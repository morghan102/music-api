import './App.css';
import { useState } from 'react'
import { apikey } from './urls' // not sure how i'd do this

// const lyric_url = `matcher.lyrics.get?q_track${nameofsonglike:sexy%20and%20i%20know%20it}&q_artist=${artist}`;
//ex of url for lyrics 'matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao' 



function App() {
  const [lyrics, setLyrics] = useState('');
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get';

  const getLyrics = async () => {
    try { //not sure if this is being used correctly here
    const res = await fetch(`${url}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${apikey}`);//this has to change
    const data = await res.json(); //i might be able to desctructure this to get to the lyrics_body
    const almostThere = data.message.body.lyrics.lyrics_body;
    setLyrics(almostThere.substring(0, almostThere.length - 69))
    console.log(lyrics)
    } catch (err) {
      alert(err)
    }
  }
  // getLyrics.catch(alert)


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
      <form>
        <label>
          Song title:
          <input
            type="text"
            value={song}
            onChange={e => setSong(e.target.value)} //e is this whole big object
          />
        </label>
        {/* break here */}
        <label>
          Artist:
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
          />
        </label>
        {/* <input type="submit" value="Submit" /> replace(" ", '%20') */}
      </form>
    )
  }


  function dropDowns() {
    return (
      <div>
        {/* i need to figure out how to get this to work */}
      </div>
    );
  }

  return (
    <div className="App">
      <header >
        <h1>This is the header </h1>
      </header>
      <body>
        {projectExplanation()}
        {/* {dropDowns()} */}
        {MusicForm()}
        <button onClick={getLyrics}>Get Those Lyrics</button> {/* this will handle submission of the music form */}
        <p>{lyrics}</p>
      </body>
    </div>
  );
}

export default App;

// 
// musixmatch expects a tracking thing in here that i need to add