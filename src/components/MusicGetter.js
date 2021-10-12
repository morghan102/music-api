import { useState, useContext, useEffect } from 'react'
import { Button, Col, Row, Form, Container } from 'react-bootstrap';
import { musixApikey, musixUrl, spotifyClientID, spotifySecret } from '../shared/urls.js';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { AppContext } from '../context';
import SpotifyGetPlaylists from './SpotifyGetPlaylists';
import SpotifyLoginButton from './SpotifyLoginButton.js';


export default function MusicGetterForm() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [playlistsorLyric, setPlaylistsorLyrics] = useState('');

    const { dispatchSongEvent, dispatchError } = useContext(AppContext);

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

    return (
        <div>
            <Form>
                <Row className="justify-content-sm-center">
                    <Col sm="auto">
                        <Form.Control
                            onChange={e => setPlaylistsorLyrics(e.target.value)}
                            as="select"
                        >
                            <option>Would you like to use playlists or lyrics?</option>
                            <option value="lyrics">Lyrics</option>
                            <option value="playlists">Playlists</option>
                        </Form.Control>
                    </Col>
                    {/* i might be able to combine the 2 formcontrol/option things w some conditional rendering */}
                    {playlistsorLyric === 'lyrics' ?
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
                                    // onChange={e => setCanvas(e.target.value)}
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
                        : playlistsorLyric === 'playlists' ?
                            <Col sm="auto">
                                <Row>
                                    <Col sm="auto">
                                        <Form.Control
                                            onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                                            as="select"
                                        >
                                            {/* update the values below */}
                                            <option>Select a Canvas</option>
                                            <option value="a">a</option>
                                            <option value="b">b</option>
                                            <option value="c">C</option>
                                        </Form.Control>
                                    </Col>
                                    <Col sm="auto">
                                        <SpotifyLoginButton />
                                        <SpotifyGetPlaylists />
                                    </Col>
                                </Row>
                            </Col>
                            : null
                    }
                </Row>
            </Form>
        </div>
    )
}