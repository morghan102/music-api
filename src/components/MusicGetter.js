import { useState, useContext, useEffect } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { musixApikey, musixUrl, spotifyClientID, spotifySecret } from '../shared/urls.js';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { AppContext } from '../context';
import Spotify from 'spotify-web-api-js';
import SpotifyWebApi from 'spotify-web-api-js';
// var s = new Spotify(); not sure when this is to be used over the spotifywebapi
// const spotifyApi = new SpotifyWebApi();
// console.log(spotifyApi)

const spotify_auth_endpoint = 'https://accounts.spotify.com/authorize';
const redirect_uri_after_login = 'http://localhost:3000/home';
const scopes = ['playlist-read-private'] //can add more here https://developer.spotify.com/documentation/general/guides/scopes/
const scopes_url_param = scopes.join("%20");

const getReturnedParamsFromSpotAuth = (hash) => {
    const params = hash.substring(1).split("&").reduce((acc, curr) => {
        console.log(curr)
        const [k, v] = curr.split("=");
        acc[k] = v;
        return acc;
    }, {});
    return params;
}


export default function MusicGetterForm() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [trackorLyric, setTrackorLyrics] = useState('');

    const { dispatchSongEvent, dispatchError } = useContext(AppContext);

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotAuth(window.location.hash); //desctructuing the value
        localStorage.clear(); //localstorage is just a temp solution?
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("expiresIn", expires_in);
        localStorage.setItem("tokenType", token_type);
        }
    })

    const getLyrics = async () => {
        try {
            const res = await fetch(`${musixUrl}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${musixApikey}`);
            const data = await res.json()
            const fullLyrics = data.message.body.lyrics.lyrics_body;
            console.log(fullLyrics)
            dispatchSongEvent('GET_LYRICS', fullLyrics.substring(0, fullLyrics.length - 69)) //dont need setLyrics(fullLyrics.substring(0, fullLyrics.length - 69)) bc Contexterror handling
        } catch (err) {
            dispatchError('SET_ERROR', err)
        }
    }

    const getTrack = async () => {
        // try {
        //     spotifyApi.setAccessToken(spotifySecret); //"When you set an access token, it will be used for signing your requests. An access token is required for all endpoints."
        //     // but mayeb thAT access token is supposed to be what comes back w the 1st query? like you're supposed to request it... wtf
        //     const res = await fetch("spotifyAPI");
        //     const data = await res.json()
        //     const track = '';
        //     // smth
        //     dispatchSongEvent('GET_TRACK', track)
        // } catch (err) {
        //     dispatchError('SET_ERROR', err)
        // }
        // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
        //     if (err) console.error(err);
        //     else console.log('Artist albums', data);
        // });
    }



    // const dropDowns = () => {
    //     return (
    //         <Container>
    //             <DropdownButton id="dropdown-basic-button" title="Dropdown button" variant='info'>
    //                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //             </DropdownButton>
    //         </Container>
    //     );
    // }
    const handleLogin = () => {
        window.location = `${spotify_auth_endpoint}?client_id=${spotifyClientID}&redirect_uri=${redirect_uri_after_login}&scope=${scopes_url_param}&response_type=token&show_dialog=true`

    }


    return (
        <div>
            <Button onClick={handleLogin}>Login to Spotify</Button>
            <Form>
                <Row className="justify-content-sm-center">
                    <Col sm="auto">
                        <Label>
                            Song title:
                            <input
                                type="text"
                                value={song}
                                onChange={e => setSong(e.target.value)}
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
                        <Form.Control
                            onChange={e => setTrackorLyrics(e.target.value)}
                            as="select"
                        >
                            {/* and when they select track, the login to spotify btn will appear */}
                            <option>Would you like to use tracks or lyrics?</option>
                            <option value="lyrics">Lyrics</option>
                            <option value="track">Track</option>
                        </Form.Control>
                    </Col>
                    {/* i might be able to combine the 2 formcontrol/option things w some conditional rendering */}
                    {trackorLyric === 'lyrics' ?
                        <Col sm="auto">
                            <Form.Control
                                // onChange={e => setCanvas(e.target.value)}
                                onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                                as="select"
                            >
                                <option>Select a Canvas</option>
                                <option value="a">Text Shuffle</option>
                                <option value="b">Text in Color</option>
                                <option value="c">C</option>
                            </Form.Control>
                        </Col>
                        : trackorLyric === 'track' ?
                            <Col sm="auto">
                                <Form.Control
                                    // onChange={e => setCanvas(e.target.value)}
                                    onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)} //setcanvas is gonna work right?
                                    as="select"
                                >
                                    <option>Select a Canvas</option>
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                    <option value="c">C</option>
                                </Form.Control>
                            </Col>
                            : <div></div>
                    }
                </Row>
                {/* im gonna need to reconfigure so gettrack or kyric is called depending on what the user wants */}
                <Button onClick={getTrack}>Get Those Lyrics</Button>
            </Form>
        </div>
    )
}