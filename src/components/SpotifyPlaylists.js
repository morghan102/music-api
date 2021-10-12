import '../App.css';
import { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Accordion, ListGroup } from 'react-bootstrap';
import { AppContext } from '../context';
import axios from 'axios';


export default function SpotifyPlaylists() {
    const { dispatchSongEvent, dispatchError, allPlaylists } = useContext(AppContext);
    const { playlist, setPlaylist } = useState();
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
                    // <Accordion>
                    //     <Accordion.Item eventKey={counter}>
                    //         <Accordion.Header>{pl.name}</Accordion.Header>
                    //         <Accordion.Body>{pl.description}</Accordion.Body>
                    //     </Accordion.Item>
                    // </Accordion>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            action
                            onClick={() => {
                                handleItemClick(pl)
                                setPlaylist(pl)
                            }}
                            eventKey={pl.name}
                            key={counter}
                            // Im getting an error about key not being set??? not sure why
                        >
                            {pl.name}
                        </ListGroup.Item>
                        {/* {counter++} */}
                    </ListGroup>
                )
            }, counter++) : null
        )
    }

    const handleItemClick = (pl) => {
        // setPlaylist(pl); //this kept returning an error for some reason

        // e.preventDefault();
        axios.get(pl.href, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => {
            dispatchSongEvent('SET_PLAYLIST', res.data.tracks.items)
            console.log(res.data.tracks.items)
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