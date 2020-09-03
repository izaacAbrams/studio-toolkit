import config from '../config'

const ApiService = {
    getDownload() {
        return fetch(config.API_ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": "attachment; filename='music.MP3"
            }
        })
    }
}

export default ApiService