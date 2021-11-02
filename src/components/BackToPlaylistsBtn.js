import React, { useContext } from "react";
import { Form, Col, Button } from "react-bootstrap"
import { AppContext } from "../context";

export default function BackToPlaylistsBtn() {
    const { dispatchSongEvent, dispatchError, playlistsorLyrics, allPlaylists, tracks, canvas } = useContext(AppContext);

    const BackToPlaylistsBtn = () => {
        if (tracks !== '') {
            return (
                <Col className='col-sm-auto mt-2'>
                    <Button onClick={() => removeTracks()} >Go back to playlists list</Button>
                </Col>
            )
        }
        else return null
    }

    const removeTracks = () => {
        dispatchSongEvent('SET_TRACKS', '')
    }

    return (
        <BackToPlaylistsBtn />
    )
}