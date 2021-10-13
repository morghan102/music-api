import { useState, useContext } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { musixApikey, musixUrl } from '../shared/urls.js';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { AppContext } from '../context';
import SpotifyGetPlaylists from './SpotifyGetPlaylists';
import SpotifyLoginButton from './SpotifyLoginButton.js';
import axios from 'axios';


export default function MusicGetterForm() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    // const [playlistsorLyric, setPlaylistsorLyrics] = useState('');

    const { dispatchSongEvent, dispatchError, isSpotifyLoggedIn, playlistsorLyrics, allPlaylists } = useContext(AppContext);

    const getLyrics = () => {
        axios.get(`${musixUrl}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${musixApikey}`, {
            // headers: {
            //     Authorization: 'Bearer ',
            // },
        }).then((res) => {
            const fullLyrics = res.data.message.body.lyrics.lyrics_body;
            console.log(fullLyrics)
            dispatchSongEvent('GET_LYRICS', fullLyrics.substring(0, fullLyrics.length - 69))

        }).catch((err) => {
            dispatchError('SET_ERROR', err)
            console.log(err)
        });
    }

    const handlePorLChange = (selection) => {
        dispatchSongEvent('SET_P_OR_L', selection)
        dispatchSongEvent('SET_CANVAS', '')
        dispatchSongEvent('SET_TRACKS', '')
        dispatchSongEvent('GET_LYRICS', '')
    }

    const Lyrics = () => {
        return (
            <>
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
                        onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                        as="select"
                    >
                        <option>Select a Canvas</option>
                        <option value="lyricsA">Text Shuffle</option>
                        <option value="lyricsB">Text in Color</option>
                        <option value="lyricsC">C</option>
                    </Form.Control>
                </Col>
                <Row>
                    <Col>
                        <Button onClick={getLyrics}>Get Those Lyrics</Button>
                    </Col>
                </Row>
            </>
        )
    }

    const Playlists = () => {
        return (
            <Col sm="auto">
                <Row>
                    {/* keep an eye on this. I will want to refactor at some point cuz this is ugly i think */}
                    {window.location.hash ?
                        <Col sm="auto">
                            <Form.Control
                                onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                                as="select"
                            >
                                <option>Select a Canvas</option>
                                <option value="a">a</option>
                                <option value="b">b</option>
                                <option value="c">C</option>
                            </Form.Control>
                            {allPlaylists === '' ? <SpotifyGetPlaylists /> : null}
                        </Col>

                        : <Col sm="auto">
                            <SpotifyLoginButton /> 

                            {/* {!localStorage.getItem('accessToken') ? <SpotifyLoginButton /> : null} */}
                            {/* this expires at some point and then i want it to show up again i think?? */}
                        </Col>
                    }
                </Row>
            </Col>
        )
    }


    return (
        <div>
            <Form>
                <Row className="justify-content-sm-center">
                    <Col sm="auto">
                        <Form.Control
                            onChange={e => handlePorLChange(e.target.value)}
                            as="select"
                        >
                            <option>Would you like to use playlists or lyrics?</option>
                            <option value="lyrics">Lyrics</option>
                            <option value="playlists">Playlists</option>
                        </Form.Control>
                    </Col>

                    {playlistsorLyrics === 'lyrics' ?
                        <Lyrics />
                        : playlistsorLyrics === 'playlists' ?
                            <Playlists />
                            : null
                    }
                </Row>
            </Form>
        </div>
    )
}