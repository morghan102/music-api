import React, { useContext } from "react";
import { Col, Button } from "react-bootstrap"
import { AppContext } from "../context";

export default function BackToPlaylistsBtn() {
    const { dispatchSongEvent, tracks } = useContext(AppContext);

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