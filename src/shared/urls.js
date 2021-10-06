export const apikey = '7867493a24ea215f5b6a3cf1a12114a7';

export const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get';

// export var trackChartsURL = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=mxmweekly_new&page=1&page_size=5&country=us&f_has_lyrics=1&${apikey}`
export var searchTrackURL = `http://api.musixmatch.com/ws/1.1/track.search?page_size=3&page=1&s_track_rating=desc&${apikey}`
export var trackLyricURL = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=158988975&${apikey}`