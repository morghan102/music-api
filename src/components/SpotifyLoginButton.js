import { useEffect, useContext } from 'react'
import { spotifyClientID } from '../shared/urls.js';
import { AppContext } from '../context.js';
import { Col } from 'react-bootstrap';
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
    const { dispatchSongEvent, accessToken } = useContext(AppContext);

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotAuth(window.location.hash); //desctructuing the value
            dispatchSongEvent('SET_ACCESS_TOKEN', access_token)
            dispatchSongEvent('SET_EXPIRES_IN', expires_in)
            dispatchSongEvent('SET_TOKEN_TYPE ', token_type)//idk if I actually need?
            //     localStorage.clear(); //is just a temp solution?
            //     localStorage.setItem("accessToken", access_token);
            //     localStorage.setItem("expiresIn", expires_in);
            //     localStorage.setItem("tokenType", token_type);
            //     setTimeout(() => {
            //         localStorage.clear();
            //         window.location.hash = ''
            //         console.log('hi')
            //         // refresh all those vals? / clear them and require user to log in again
            //         // will this still work if I've like stopped the terminal?
            //     }, 5) //converts it to miliseconds
        }
    })

    const handleLogin = (e) => {
        e.preventDefault();
        window.location = `${spotify_auth_endpoint}?client_id=${spotifyClientID}&redirect_uri=${redirect_uri_after_login}&scope=${scopes_url_param}&response_type=token&show_dialog=true`
        dispatchSongEvent('IS_SPOTIFY_LOGGED_IN', true);
    }

    const LoginBtn = () => {
        if (accessToken === '') return <Col>
            <button onClick={handleLogin} className='spotifyBtn'>Login to Spotify</button>
        </Col>
        else return null
    }

    return (
        <LoginBtn />
    )
}