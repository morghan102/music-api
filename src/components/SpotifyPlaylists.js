import '../App.css';
import { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, ListGroup } from 'react-bootstrap';
import { AppContext } from '../context';
import axios from 'axios';


export default function SpotifyPlaylists() {
    const { dispatchSongEvent, dispatchError, allPlaylists } = useContext(AppContext);
    const [token, setToken] = useState('');
    // const [tracksAudioFeatures, setTracksAudioFeatures] = useState([])
    const tracksAudioFeatures = [];

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    function PlaylistList() {
        let counter = 0;
        return (
            allPlaylists ? allPlaylists.map((pl) => {
                return (
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            action
                            onClick={() => handleGetTracks(pl)}
                            eventKey={pl.name}
                            key={counter}
                        // Im getting an error about key not being set??? not sure why
                        >
                            {pl.name}
                        </ListGroup.Item>
                    </ListGroup>
                )
            }, counter++) : null
        )
    }

    const handleGetTracks = (pl) => {

        // setPlaylist({pl}); //this kept returning an error for some reason
        console.log(pl.href)

        // e.preventDefault();
        axios.get(pl.href, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            const ids = extractIds(res.data.tracks.items); //fetching from that url gives me allthe same info as it is the simplified track object
            ids.forEach(id => {
                axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }).then((res) => {
                    // console.log(res.data)
                    tracksAudioFeatures.push(res.data)
                })
            })
dispatchSongEvent('SET_TRACKS', tracksAudioFeatures)


            // those didn't work
            // helper funciton to make the tracks arr of objects a diff type
            // dispatchSongEvent('SET_TRACKS', res.data.tracks.items) //sets it with the songs
            // dispatchSongEvent('SET_TRACKS', extractIds(res.data.tracks.items))
            // console.log("---")
            // console.log(typeof res.data.tracks.items)
            // console.log(res.data.tracks.items)

        }).catch((err) => {
            dispatchError('SET_ERROR', err)
            console.log(err)
        });

    }

    const extractIds = (tracksObj) => {
        const arr = [];
        tracksObj.forEach(track => {
            // console.log(track.track.id)
            arr.push(track.track.id)
        })

        return arr;

        // using a map didn't work
        //     // const map = new Map()
        //     const map = []
        //     tracksObj.map(track => {
        //         // console.log(track)
        //         for (let key in track) {
        //             map.push(key, track[key])
        //             // console.log(key, track[key])
        //         }
        //     })
        //     console.log(map)
        //     return map;
    }

    return (
        <Container>
            {/* if no playlist selected show that */}
            <Row>
                {/* make that bold and unmissable */}
                <p>Please select a playlist</p>
            </Row>
            <PlaylistList />
            {/* if playlistSelected, show playlists in dropdown and render select canvas */}
        </Container>
    )
}

// need to add this login later
// {playlists ? playlists.map((ele) => <p>{ele.tracks.href}</p>)
// // : isLoading ? <p>Hold on, loading</p> 
// // need to add isloading to context
// : null}