import { useState, useContext } from 'react'
import { Button, Col, Container, Row, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { apikey, url } from '../shared/urls.js';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { Context } from '../Store.js';

export default function LyricGetterForm(props) {
    const [lyrics, setLyrics] = useState('');
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');

    const [state, dispatch] = useContext(Context);


    const getLyrics = async () => {
        try { //not sure if this is being used correctly here
            const res = await fetch(`${url}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${apikey}`);
            const data = await res.json(); //i might be able to desctructure this to get to the lyrics_body
            // console.log(data)
            const fullLyrics = data.message.body.lyrics.lyrics_body;
            console.log(fullLyrics)
            setLyrics(fullLyrics.substring(0, fullLyrics.length - 69))
            dispatch({ type: 'GET_LYRICS', payload: lyrics })
            // console.log(lyrics)
            // } catch (err) { //this was the way before adding context
            //     alert(err) 
            // }
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err })
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
            <Button onClick={getLyrics}>Get Those Lyrics</Button>
        </Form>
    )
}