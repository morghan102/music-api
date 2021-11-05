import '../App.css';
import { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, ListGroup } from 'react-bootstrap';
import { AppContext } from '../context';
import axios from 'axios';
import axiosRetry from 'axios-retry'; //cant get this tow work. trying to handle if too many req are made to spotify


export default function SpotifyPlaylistsList() {
    const { dispatchSongEvent, dispatchError, allPlaylists, accessToken } = useContext(AppContext);
    // const [token, setToken] = useState('');
    // const [tracksAudioFeatures, setTracksAudioFeatures] = useState([])
    const tracksAudioFeatures = [];
    const tracksArtists = [];
    const tracksNames = [];

    const [error, setError] = useState('');

    // useEffect(() => {
    //     if (localStorage.getItem('accessToken')) {
    //         setToken(localStorage.getItem('accessToken'))
    //     }
    // }, [])

    function PlaylistList() {
        let counter = 0;
        return (
            <ListGroup variant="flush" className='playlistLitGrp'>
                {allPlaylists ? allPlaylists.map((pl) => {
                    counter++
                    return (
                        <ListGroup.Item
                            action
                            onClick={() => handleGetTracks(pl)}
                            eventKey={pl.name}
                            key={counter}
                        >
                            {pl.name}
                        </ListGroup.Item >
                    )
                }) : null}
            </ListGroup>
        )
    }

    // const getTrack = (id) => {
    //     return axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
    //         headers: {
    //             Authorization: 'Bearer ' + accessToken,
    //         },
    //     })
    // }
    //shd probably put all this in its own component
    const handleGetTracks = (pl) => {
        let retryAfter = 0;
        // e.preventDefault();
        dispatchSongEvent('SET_PLAYLIST_NAME', pl.name)
        axios.get(pl.href, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }).then((res) => {
            // this is for getting name of the tracks and artists to the graph
            res.data.tracks.items.forEach((track) => tracksNames.push(track.track.name))
            res.data.tracks.items.forEach((track, i) => {
                let arr = [];
                track.track.artists.forEach(function (arrayItem) {
                    var x = arrayItem.name;
                    arr.push(x);
                })
                tracksArtists.push(arr)
            })



            // fetches the audio features of ea track
            const ids = extractIds(res.data.tracks.items);
            ids.forEach(id => {
                // fetchAndRetryIfNecessary(() => )

                axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                    // 'axios-retry': {
                    //     retries: 3,
                    //     retryDelay: (retryCount) => {
                    //         return retryCount * 3000;
                    //     }
                    // }
                })
                    .then((res) => {
                        // if (res.status === 429) { //this doesnt run at all
                        //     setTimeout(getTrack(id), res.headers.get('retry-after') * 1000)
                        //     console.log('you')
                        // }
                        tracksAudioFeatures.push(res.data)
                    }).catch((err) => { //can deal w 429s here
                        if (err.response) {// client received an error response (5xx, 4xx)
                            if (err.response.status === 429) {
                                console.log(err.response)
                                retryAfter = err.response.headers.retryAfter;

                            }
                            // else if ()
                        } else if (err.request) { // client never received a response, or request never left

                        } else {

                        }
                        setError(err)
                    })
                // if (res.status === 429) {
                //     const millis = getMillis(retryAfter)
                //     // sleep(millis);
                //     setTimeout(res(), millis)
                // }

            })
            dispatchSongEvent('SET_TRACKS', { 'audioFeatsVals': tracksAudioFeatures, 'tracksNames': tracksNames, 'tracksArtists': tracksArtists })
        }).catch((err) => { //can deal w 429s here
            console.log(err)
            if (err.response) {// client received an error response (5xx, 4xx)
                // console.log('no')
                // if (err.response.statusCode === 429) return console.log('wow')
                // else if ()
            } else if (err.request) { // client never received a response, or request never left

            } else {

            }
            // dispatchError('SET_ERROR', err)
            setError(err)
            console.log(err)
        });
    }

    const extractIds = (tracksObj) => {
        const arr = [];
        tracksObj.forEach(track => arr.push(track.track.id))
        return arr;
    }

    // function sleep(milliseconds) {
    //     return new Promise((resolve) => setTimeout(resolve, milliseconds))
    // }

    // function getMillis(retryHeaderStr) {
    //     let millis = Math.round(parseFloat(retryHeaderStr) * 1000)
    //     if (isNaN(millis)) {
    //         millis = Math.max(0, new Date(retryHeaderStr) - new Date())
    //     }
    //     return millis;
    // }

    // async function fetchAndRetryIfNecessary(callAPIFn) {
    //     const res = await callAPIFn()
    //     if (res.status === 429) {
    //         const retryAfter = res.headers.get('retry-after')
    //         const millis = getMillis(retryAfter)
    //         // await sleep(millis);
    //         return fetchAndRetryIfNecessary(callAPIFn)
    //     }
    //     return res;
    // }

    return (
        <Container className='playlistList'>
            {/* if no playlist selected show that */}
            <Row className='playlistList'>
                {/* make that bold and unmissable */}
                <p>Please select a playlist</p>
            </Row>
            <PlaylistList />
            {error ? <p>{error}</p> : null}
            {/* if playlistSelected, show playlists in dropdown and render select canvas */}
        </Container>
    )
}

// need to add this login later
// {playlists ? playlists.map((ele) => <p>{ele.tracks.href}</p>)
// // : isLoading ? <p>Hold on, loading</p> 
// // need to add isloading to context
// : null}