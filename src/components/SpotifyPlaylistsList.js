import '../App.css';
import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, ListGroup } from 'react-bootstrap';
import { AppContext } from '../context';
import axios from 'axios';


export default function SpotifyPlaylistsList() {
    const { dispatchSongEvent, dispatchError, allPlaylists, accessToken } = useContext(AppContext);
    // const [token, setToken] = useState('');
    // const [tracksAudioFeatures, setTracksAudioFeatures] = useState([])
    const tracksAudioFeatures = [];

    // useEffect(() => {
    //     if (localStorage.getItem('accessToken')) {
    //         setToken(localStorage.getItem('accessToken'))
    //     }
    // }, [])

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
        // e.preventDefault();
        axios.get(pl.href, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }).then((res) => {
            const ids = extractIds(res.data.tracks.items);
            ids.forEach(id => {
                axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }).then((res) => {
                    tracksAudioFeatures.push(res.data)
                })
            })
            dispatchSongEvent('SET_TRACKS', tracksAudioFeatures)

        }).catch((err) => {
            dispatchError('SET_ERROR', err)
            console.log(err)
        });

    }

    const extractIds = (tracksObj) => {
        const arr = [];
        tracksObj.forEach(track => arr.push(track.track.id))

        return arr;
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