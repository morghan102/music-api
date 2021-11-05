import { useState, useContext } from 'react'
import { Button, Col, Row, Form, Container } from 'react-bootstrap';
import { musixApikey, musixUrl } from '../shared/urls.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Label } from 'reactstrap';
import '../App.css'
import { AppContext } from '../context';
import SpotifyGetPlaylists from './SpotifyGetPlaylists';
import SpotifyLoginButton from './SpotifyLoginButton.js';
import CanvasSelector from './CanvasSelector.js';
import BackToPlaylistsBtn from './BackToPlaylistsBtn.js';
import ErrorBoundary from './ErrorBoundary';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default function MusicGetterForm() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [error, setError] = useState('');

    const { dispatchSongEvent, playlistsorLyrics, tracks, canvas } = useContext(AppContext);
    // https://allorigins.win/
    const getLyrics = () => {
        setSong('');
        setArtist('');
        setError('')
        dispatchSongEvent('RESET_VALUES', null)

        dispatchSongEvent('LOADING', true)
        axios.get((`https://api.allorigins.win/get?url=${encodeURIComponent(`${musixUrl}?q_track=${song.replace(" ", '%20')}q_artist=${artist.replace(" ", '%20')}o&apikey=${musixApikey}`)}`)
        ).then((res) => {
            let contents = (JSON.parse(res.data.contents))
            if (contents.message.header.status_code !== 200) throw new Error(contents.message.header.status_code)
            return contents;
        }).then((res) => {
            console.log(res.message.body.lyrics.lyrics_body)
            const fullLyrics = res.message.body.lyrics.lyrics_body;
            dispatchSongEvent('GET_LYRICS', fullLyrics.substring(0, fullLyrics.length - 69))
            dispatchSongEvent('LOADING', false)
            dispatchSongEvent('SET_COPYRIGHT', res.message.body.lyrics.lyrics_copyright)

        }).catch((err) => {
            dispatchSongEvent('LOADING', false)
            console.log(err.toString())
            setError(err.toString());
        });
    }

    const handlePorLChange = (selection) => {
        dispatchSongEvent('SET_P_OR_L', selection)
        dispatchSongEvent('SET_CANVAS', '')
        dispatchSongEvent('SET_TRACKS', '')
        dispatchSongEvent('GET_LYRICS', '')
        dispatchSongEvent('RESET_VALUES', selection)
        console.log(selection)
    }


    const SelectGraphingOpts = () => {
        // let track = '';
        // let keys = ''
        // if (tracks !== '') {
        //     track = (tracks[Object.keys(tracks)[0]])
        //     if (track) keys = Object.keys(track);
        // };//keys are strings not index

        // {/* the appearance of this is dependent on if they choose the graph canvas */ }
        // {/* i wanted to put this whole col into selectGraphOts. possible?? */ }
        return (
            canvas === 'graph' && tracks !== '' ?
                <Col className='col-sm-auto mt-2'>
                    <Form.Control
                        onChange={e => {
                            dispatchSongEvent('SET_VAL_OF_GRAPH_SKETCH', e.target.value)
                        }}
                        as="select"
                    >

                        <option>What value would you like to graph on?</option>
                        <option value="danceability">Danceability</option>
                        <option value="energy">Energy</option>
                        <option value="loudness">Loudness</option>
                        <option value="mode">Mode</option>
                        <option value="speechiness">Speechiness</option>
                        <option value="acousticness">Acousticness</option>
                        <option value="instrumentalness">Instrumentalness</option>
                        <option value="liveness">Liveness</option>
                        <option value="valence">Valence</option>
                        <option value="tempo">Tempo</option>
                        {/* i wanted this to set dybnamillacy but couldnt get it to work
                        {keys.forEach((k) => {
                            <option value={k}>{k}</option>
                        })} 
                        WORKS w ul and li but would take some more configuring - maybe later
                        pluralsight.com/guides/how-to-implement-a-component-"loop"-with-react
                        <ul>
                        {keys.map((item) => {
                            return <li key={item}>{item}</li>
                        })}
                    </ul> */}
                    </Form.Control>
                </Col>
                : null
        )
    }


    const PlaylistsView = () => {

        return (
            <Row className='justify-content-center '>
                <SpotifyLoginButton />
                <SpotifyGetPlaylists />
                <CanvasSelector />
                <BackToPlaylistsBtn />
                <SelectGraphingOpts />
            </Row>

        )
    }


    return (
        <Container className=''>
            <Row className='justify-content-center mb-3'>
                <Col sm={5} lg={3}>
                    <Form.Control
                        onChange={e => handlePorLChange(e.target.value)}
                        as="select"
                    >
                        <option>Playlists or Lyrics?</option>
                        <option value="lyrics">Lyrics</option>
                        <option value="playlists">Playlists</option>
                    </Form.Control>
                </Col>
            </Row>

            {playlistsorLyrics === 'lyrics' ? //cannot remove this to a function/component bc the inputs dont stay focused. v annoying
                <Form>
                    <Row className=' justify-content-center align-items-md-end align-items-sm-center flex-sm-column flex-md-row'>
                        <Col className=' col-xl-3 col-lg-4 col-sm-7 mb-3'>
                            <Label className=''>
                                Song:
                                <input
                                    style={{ marginLeft: 5 }}
                                    type="text"
                                    value={song}
                                    onChange={e => setSong(e.target.value)}
                                    key={0}
                                />
                            </Label>
                        </Col>
                        <Col className=' col-xl-3 col-lg-4 col-sm-7 mb-3 '>
                            <Label>
                                Artist:
                                <input
                                    style={{ marginLeft: 5 }}
                                    type="text"
                                    value={artist}
                                    onChange={e => setArtist(e.target.value)}
                                    key={1}
                                />
                            </Label>
                        </Col>

                        <Col className=' d-flex justify-content-center col-xl-2 col-lg-3 col-sm-5 mb-3 '>
                            <CanvasSelector />
                        </Col>

                        {error ? <Row className={'my-5'}>
                            <Col>
                                <p>There has been an error: {error}</p>
                                <p>MusixMatch's library is limited; try a different song or check the spelling.</p>
                            </Col>
                        </Row> : null}
                    </Row>
                    <Row className=''>
                        <Col className=''>
                            <Button onClick={getLyrics}>Get Those Lyrics</Button>
                        </Col>
                    </Row>
                </Form>

                : playlistsorLyrics === 'playlists' ?
                    <ErrorBoundary>
                        <PlaylistsView />
                    </ErrorBoundary>

                    : null}
        </Container>
    )
}