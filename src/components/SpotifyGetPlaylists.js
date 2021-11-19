import React, { useContext, useState } from "react";
import '../App.css';
import { AppContext } from '../context';
import axios from "axios";
import { Col } from "react-bootstrap";

const playlists_endpoint = 'https://api.spotify.com/v1/me/playlists';//this is for the logged in user: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-list-users-playlists

const SpotifyGetPlaylists = () => {
    const { dispatchSongEvent, accessToken, allPlaylists } = useContext(AppContext);
    const [error, setError] = useState('');

    const handleGetPlaylists = (e) => {
        dispatchSongEvent('LOADING', true)
        e.preventDefault();
        axios.get(playlists_endpoint, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }).then((res) => {
            dispatchSongEvent('SET_ALL_PLAYLISTS', res.data.items)
            dispatchSongEvent('LOADING', false)
        }).catch((err) => {
            console.log(err.toString())
            setError(err.toString())
            dispatchSongEvent('LOADING', false)
        });
    };

    const GetPlaylistsBtn = () => {
        return <button onClick={handleGetPlaylists} className='spotifyBtn'>Get Your Playlists</button>
    }

    return (
        allPlaylists === '' && window.location.hash ?
            <Col>
                <GetPlaylistsBtn />
                {error ? <p>{error}</p> : null}
            </Col>
            : null

    );
}

export default SpotifyGetPlaylists;