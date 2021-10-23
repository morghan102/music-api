import React, { useContext } from "react";
import '../App.css';
import { AppContext } from '../context';
import axios from "axios";

const playlists_endpoint = 'https://api.spotify.com/v1/me/playlists';//this is for the logged in user: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-list-users-playlists

const SpotifyGetPlaylists = () => {
    // const [token, setToken] = useState('');
    // const [isLoading, setIsLoading] = useState(false); need to put this in the context
    // const [data, setData] = useState({});//this will be teh data we get from spotify
    const { dispatchSongEvent, dispatchError, accessToken, allPlaylists } = useContext(AppContext);

    // useEffect(() => {
    //     // error where it's not resetting this value after i stop the server, so i don't have a token or peace of mind
    //     // if (localStorage.getItem('accessToken')) {
    //     //     console.log(localStorage.getItem('expiresIn'))
    //     //     setToken(localStorage.getItem('accessToken'))
    //     //     console.log("token is:")
    //     //     console.log(token)
    //     // }
    // }, [])

    const handleGetPlaylists = (e) => {
            dispatchSongEvent('LOADING', true)
        e.preventDefault();
        // setIsLoading(true);
        axios.get(playlists_endpoint, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }).then((res) => {
            // setIsLoading(false);
            dispatchSongEvent('SET_ALL_PLAYLISTS', res.data.items)
            dispatchSongEvent('LOADING', false)
            // setData(res.data) //i want to set this info with the context
        }).catch((err) => {
            dispatchError('SET_ERROR', err)
            console.log(err)
        });
    };

    const GetPlaylistsBtn = () => {
        if (allPlaylists === '' && window.location.hash) {
            return <button onClick={handleGetPlaylists} className='spotifyBtn'>Get Your Playlists</button>
        } else return null;
    }
    //adding loading thing is necessary
    return (
        <>
        <GetPlaylistsBtn />
            {/* moved to app.js {!isLoading && playlists ? playlists.map((ele) => <p>{ele.name}</p>)
                : isLoading ? <p>Hold on, loading</p>
                    : null} */}
            {/* // using experimental optional chaining */}
            {/* {data?.items ? data.items.map((ele) => <p>{ele.name}</p>) : null} */}
        </>
    );
}

export default SpotifyGetPlaylists;