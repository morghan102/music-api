import { url, apikey } from '../urls';
import App from '../App';
const express = require('express');
const request = require('request'); //not sure i need?

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(res.header)
    next();
});

app.get('/express_backend', (req, res) => {
    request(
        { url: `${url}?q_track=${App.song.replace(" ", '%20')}q_artist=${App.artist.replace(" ", '%20')}o&apikey=${apikey}` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }

            res.json(JSON.parse(body));
        }
    )
});

// trying to fix the cors error, failed