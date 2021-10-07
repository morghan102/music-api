import { useState, useContext } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { apikey, url } from '../shared/urls.js';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { AppContext } from '../context';

export default function LyricGetterForm(props) {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');

    const { dispatchLyricEvent, dispatchError } = useContext(AppContext);


    const getLyrics = async () => {
        try {
            const res = await fetch(`${url}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${apikey}`);
            const data = await res.json()
            const fullLyrics = data.message.body.lyrics.lyrics_body;
            dispatchLyricEvent('GET_LYRICS', fullLyrics.substring(0, fullLyrics.length - 69)) //dont need setLyrics(fullLyrics.substring(0, fullLyrics.length - 69)) bc Contexterror handling
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
                    <Form.Select>
                        <option value="0">Select preferred way of displaying the data</option>
                        <option value="1">1st way of displaying the data</option>
                        <option value="2">2nd way of displaying the data</option>
                        <option value="3">3rd way of displaying the data</option>
                    </Form.Select>
                </Col>
            </Row>
            <Button onClick={getLyrics}>Get Those Lyrics</Button>
        </Form>
    )
}