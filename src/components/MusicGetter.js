import { useState, useContext, useEffect } from 'react'
import { Button, Col, Row, Form, Container } from 'react-bootstrap';
import { musixApikey, musixUrl } from '../shared/urls.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
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

    // const [playlistsorLyric, setPlaylistsorLyrics] = useState('');

    const { dispatchSongEvent, dispatchError, playlistsorLyrics, allPlaylists, tracks, canvas } = useContext(AppContext);
    // https://allorigins.win/
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
            // console.log(contents.message)
            return contents;
            // throw new Error('Network response was not ok.')
            // const fullLyrics = parsed.message.body.lyrics.lyrics_body;
            // console.log(fullLyrics)
            // dispatchSongEvent('GET_LYRICS', fullLyrics.substring(0, fullLyrics.length - 69))
            // dispatchSongEvent('LOADING', false)
            // dispatchSongEvent('SET_COPYRIGHT', res.data.message.body.lyrics.lyrics_copyright)
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

            // throw new Error(err)
            // dispatchError('SET_ERROR', err)
            // console.log(err)
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

    // getTrackKeys = async () => {
    //     await 
    // }

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
                <Col sm="auto">
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

    // const LyricsView = () => {
    //     return (
    //         <>
    //             <Col sm="auto">
    //                 <Label>
    //                     Song title:
    //                     <input
    //                         style={{ marginLeft: 5 }}
    //                         type="text"
    //                         value={song}
    //                         onChange={e => setSong(e.target.value)}
    //                         key={0}
    //                     />
    //                 </Label>
    //             </Col>
    //             <Col sm="auto">
    //                 <Label>
    //                     Artist:
    //                     <input
    //                         style={{ marginLeft: 5 }}
    //                         type="text"
    //                         value={artist}
    //                         onChange={e => setArtist(e.target.value)}
    //                         key={1}
    //                     />
    //                 </Label>
    //             </Col>
    //             <Col sm="auto">
    //                 <CanvasSelector />
    //             </Col>
    //             <Row>
    //                 <Col>
    //                     <Button onClick={getLyrics}>Get Those Lyrics</Button>
    //                 </Col>
    //             </Row>
    //         </>
    //     )
    // }

    const PlaylistsView = () => {

        // useEffect(() => { //this is running ea time any of the vals are updated :( 
        //     dispatchSongEvent('RESET_VALUES', 'lyrics')
        // }, []);


        return (
            <Col sm="auto">
                <Row>
                    <Col sm="auto">
                        <SpotifyLoginButton />
                        <SpotifyGetPlaylists />
                    </Col>
                    <CanvasSelector />
                    <BackToPlaylistsBtn />
                    {/* keep an eye on this. I will want to refactor at some point cuz this is ugly i think */}
                    {/* <Col sm="auto">
                        <Form.Control
                            onChange={e => dispatchSongEvent('SET_CANVAS', e.target.value)}
                            as="select"
                            // defaultValue={e.target.value} need to get option selected to stay populated
                        >
                            <option>Select a Canvas</option>
                            <option value="graph">Graph Values</option>
                            <option value="b">b</option>
                            <option value="c">C</option>
                        </Form.Control>
                        {/* change */}
                    {/* </Col> */}
                    <SelectGraphingOpts />

                </Row>
            </Col>
        )
    }


    return (
        <Container >
            <Row className='justify-content-center mb-3'>
                <Col sm={5} lg={2}>
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
                                    // className='mx-md-1'
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
        // <Row 

        // // className='d-flex justify-content-center border text-center flex-sm-column flex-xl-row '
        // >
        //     <Col
        //      sm="auto" lg={2} className=''
        //     >
        //         <Form.Control
        //             onChange={e => handlePorLChange(e.target.value)}
        //             as="select"
        //         >
        //             <option>Playlists or Lyrics?</option>
        //             <option value="lyrics">Lyrics</option>
        //             <option value="playlists">Playlists</option>
        //         </Form.Control>
        //     </Col>

        //     {playlistsorLyrics === 'lyrics' ? //cannot remove this to a function/component bc the inputs dont stay focused. v annoying
        //         // <>
        //         // <ErrorBoundary>justify-content-sm-center
        //         <Col 
        //         // className="flex-sm-column d-flex" xl='auto' sm={6} 
        //         >
        //             <Form>
        //                 <Row 
        //                 // className="flex-sm-column flex-xl-row  d-flex" xl='auto'  sm={6}
        //                 >

        //                     {console.log(error)}
        //                     {/* i want to add  style={{marginTop: '10px'}} to the top when its small  className="border border-primary"*/}
        //                     <Col className=""
        //                     // xs={12} md={5}
        //                     >
        //                         <Label>
        //                             Song title:
        //                             <input
        //                                 className='mx-md-1'
        //                                 style={{ marginLeft: 5 }}
        //                                 type="text"
        //                                 value={song}
        //                                 onChange={e => setSong(e.target.value)}
        //                                 key={0}
        //                             />
        //                         </Label>
        //                     </Col>
        //                     <Col className="" 
        //                     // xs={12} md={5}
        //                     >
        //                         <Label>
        //                             Artist:
        //                             <input
        //                                 className='mx-md-1'
        //                                 style={{ marginLeft: 5 }}
        //                                 type="text"
        //                                 value={artist}
        //                                 onChange={e => setArtist(e.target.value)}
        //                                 key={1}
        //                             />
        //                         </Label>
        //                     </Col>

        //                     <Col
        //                     //  sm='auto' lg={2} className=''
        //                     >
        //                         <CanvasSelector />
        //                     </Col>

        //                     {error ? <Row className={'my-5'}>
        //                         <Col>
        //                             <p>There has been an error: {error}</p>
        //                         </Col>
        //                     </Row> : null}
        //                     {/* error is hitting the boundary, but only bc you can't pass an obj as a child, which is what i'm (accidentally) 
        //                         doing when there's an error. I am aware this is the wrong way to handle errors here but I am getting my desired behavior 
        //                         and am not going to "fix" it */}
        //                 </Row>
        //             </Form>
        //         </Col>
        //         // </ErrorBoundary>
        //         // </>
        //         : playlistsorLyrics === 'playlists' ?
        //             <ErrorBoundary>
        //                 <PlaylistsView />
        //             </ErrorBoundary>
        //             : null
        //     }
        //     {playlistsorLyrics === 'lyrics' ?
        //         <Row className=''>
        //             <Col className=''>
        //                 <Button onClick={getLyrics}>Get Those Lyrics</Button>
        //             </Col>
        //         </Row> : null}
        // </Row >
    )
}