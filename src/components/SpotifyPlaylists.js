import '../App.css';
import { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Accordion, ListGroup } from 'react-bootstrap';
import { AppContext } from '../context';
import axios from 'axios';


export default function SpotifyPlaylists() {
    const { dispatchSongEvent, dispatchError, allPlaylists, tracks } = useContext(AppContext);
    const [token, setToken] = useState('');

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
                            onClick={() => handleItemClick(pl)}
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

    const handleItemClick = (pl) => {

        // setPlaylist({pl}); //this kept returning an error for some reason
            console.log(pl.href)

        // e.preventDefault();
        axios.get(pl.href, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            dispatchSongEvent('SET_TRACKS', res.data.tracks.items) //sets it with the songs
        }).catch((err) => {
            dispatchError('SET_ERROR', err)
            console.log(err)
        });

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