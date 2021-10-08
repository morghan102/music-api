import { useState, useContext } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { apikey, url } from '../shared/urls.js';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { AppContext } from '../context';

export default function MusicGetterForm() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [trackorLyric, setTrackorLyrics] = useState('');

    const { dispatchSongEvent, dispatchError } = useContext(AppContext);


    const getLyrics = async () => {
        try {
            const res = await fetch(`${url}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${apikey}`);
            const data = await res.json()
            const fullLyrics = data.message.body.lyrics.lyrics_body;
            console.log(fullLyrics)
            dispatchSongEvent('GET_LYRICS', fullLyrics.substring(0, fullLyrics.length - 69)) //dont need setLyrics(fullLyrics.substring(0, fullLyrics.length - 69)) bc Contexterror handling
        } catch (err) {
            dispatchError('SET_ERROR', err)
        }
    }

    const getTrack = async () => {
        try {
            const res = await fetch("spotifyAPI");
            const data = await res.json()
            const track = '';
            // smth
            dispatchSongEvent('GET_TRACK', track)
        } catch (err) {
            dispatchError('SET_ERROR', err)
        }
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


    return (
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
                        <option>Would you like to use tracks or lyrics?</option>
                        <option value="lyrics">Lyrics</option>
                        <option value="track">Track</option>
                    </Form.Control>
                </Col>
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
                    : <Col sm="auto">
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
                }
            </Row>
            <Button onClick={getLyrics}>Get Those Lyrics</Button>
        </Form>
    )
}