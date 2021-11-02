import React, { useContext } from "react";
import { Form, Col } from "react-bootstrap"
import { AppContext } from "../context";


export default function CanvasSelector() {
    const { dispatchSongEvent, playlistsorLyrics, allPlaylists } = useContext(AppContext);

    const Canvas = () => {
        if (playlistsorLyrics === 'playlists' && allPlaylists !== '') {
            return (
            <Col className='col-sm-4 col-md-3 mt-2'>
                <Form.Control
                    onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                    as="select"
                //    className='border border-danger'

                // defaultValue={e.target.value} need to get option selected to stay populated
                >
                    <option>Select a Canvas</option>
                    <option value="graph">Graph Values</option>
                    <option value="b">b</option>
                    <option value="c">C</option>
                </Form.Control>
                 {/* change */}
            </Col>
            )
        } else if (playlistsorLyrics === 'lyrics') {
            return <Form.Control
                onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                as="select"
            >
                <option>Select a Canvas</option>
                <option value="lyricsA">Text Shuffle</option>
                <option value="lyricsB">Text in Color</option>
                <option value="lyricsC">C</option>
            </Form.Control>
        } else return null;
    }
    return (
        <Canvas />
    )
}