import { useEffect } from 'react'
import { spotifyClientID } from '../shared/urls.js';
// import { Button, Col, Row, Form, Container } from 'react-bootstrap';


const spotify_auth_endpoint = 'https://accounts.spotify.com/authorize';
const redirect_uri_after_login = 'http://localhost:3000/';
const scopes = ['playlist-read-private'] //can add more here https://developer.spotify.com/documentation/general/guides/scopes/
const scopes_url_param = scopes.join("%20");

const getReturnedParamsFromSpotAuth = (hash) => {
    const params = hash.substring(1).split("&").reduce((acc, curr) => {
        // console.log(curr)
        const [k, v] = curr.split("=");
        acc[k] = v;
        return acc;
    }, {});
    return params;
}


export default function SpotifyLoginButton() {

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotAuth(window.location.hash); //desctructuing the value
            localStorage.clear(); //localstorage is just a temp solution?
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type);
        }
    })
    const handleLogin = (e) => {
        e.preventDefault();
        window.location = `${spotify_auth_endpoint}?client_id=${spotifyClientID}&redirect_uri=${redirect_uri_after_login}&scope=${scopes_url_param}&response_type=token&show_dialog=true`
    }

    return (
        <button onClick={handleLogin} className='spotifyBtn'>Login to Spotify</button>
    )
}