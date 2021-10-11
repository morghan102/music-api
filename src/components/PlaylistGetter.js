import { useState, useContext } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { musixApikey, musixUrl, spotifyClientID, spotifySecret } from '../shared/urls.js';
import 'bootstrap/dist/css/bootstrap.css'; //i think i dont use
import { Label } from 'reactstrap';
import { AppContext } from '../context';
import { request } from 'express';
// import Spotify from 'spotify-web-api-js';
// import SpotifyWebApi from 'spotify-web-api-js';


export const PlaylistGetter = () => {
//THIS DID NOT WORK. MOVING ONTO A REACT SPECIFIC VIDEO
    // const request = require("request");
    // const userID = 'matt';
    // const playlistsUrl = `https://api.spotify.com/v1/users/${userID}/playlists`; //https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-list-users-playlists
    // const token = "Bearer"

    // const getTrack = async () => {
    //     // try {
    //     request({ url: playlistsUrl, headers: { "Authorization": token } }, function (err, res) {
    //         console.log(res)
    //         if (res) {
    //             var playlists = JSON.parse(res.body);
    //             var playlistUrl = playlists.items[0].href;
    //             console.log(playlists)
    //             console.log(playlistUrl)
    //             request({ url: playlistUrl, headers: { "Authorization": token } }, function (err, res) {
    //                 console.log(res)
    //                 var playlist = JSON.parse(res.body)
    //                 console.log("playlist: " + playlist.name)

    //                 playlist.tracks.forEach(function(track){
    //                     console.log(track.track.name)
    //                 })
    //             })
    //         }
    //     })
    // }


}