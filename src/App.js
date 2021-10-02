import './App.css';
import { View, useState } from 'react'
import { apikey } from './urls' // not sure how i'd do this

let lyrics;
// const lyric_url = `matcher.lyrics.get?q_track${nameofsonglike:sexy%20and%20i%20know%20it}&q_artist=${artist}`;
//ex of url for lyrics 'matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao' 


function App() {
  const [lyrics, setLyrics] = useState('');

  const getLyrics = async () => {
    const res = await fetch(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=adventure%20of%20a%20lifetimeq_artist=coldplayo&apikey=${apikey}`);//this has to change
    const data = await res.json(); //i might be able to desctructure this
    setLyrics(data.message.body.lyrics.lyrics_body)
    console.log(lyrics)
  }

  function projectExplanation() {
    return (
      <div>
        <div>
          <h3>This is an explanation of what the project is about</h3>
        </div>
        <div>
          <p>This is what I'll type in the explanation.</p>
        </div>
      </div>
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
        <button onClick={getLyrics}>fetch</button>
        <p>{lyrics}</p>
      </body>
    </div>
  );
}

export default App;

// 
// musixmatch expects a tracking thing in here that i need to add