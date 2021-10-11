import React, { useEffect, useState, useContext } from "react";
import '../App.css';
import { AppContext } from '../context';
import axios from "axios";

const playlists_endpoint = 'https://api.spotify.com/v1/me/playlists';//this is for the logged in user: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-list-users-playlists

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});//this will be teh data we get from spotify
    const { dispatchSongEvent, dispatchError, playlists } = useContext(AppContext);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    const handleGetPlaylists = (e) => {
        e.preventDefault();
        axios.get(playlists_endpoint, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            dispatchSongEvent('SET_PLAYLISTS', res.data.items)
            // setData(res.data) //i want to set this info with the context
        }).catch((err) => {
            dispatchError('SET_ERROR', err)
            console.log(err)
        });
    };
//adding loading thing is necessary
    return (
        <>
            <button onClick={handleGetPlaylists} className='spotifyBtn'>Get Your Playlists</button>
            {/* // using experimental optional chaining */}
            {/* {data?.items ? data.items.map((ele) => <p>{ele.name}</p>) : null} */}
        </>
    );
}

export default SpotifyGetPlaylists;