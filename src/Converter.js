import React, {Component} from 'react'
import ApiService from './services/api-service'
class Converter extends Component {

    handleSubmit(e) {
        e.preventDefault()
        ApiService.getDownload()
        // browser.downloads.download({
        //     url: 'https://www.youtube.com/watch?v=IBDgHaTy_wU',
        //     filename: "music.mp3"
        // })
    }
    render() {
        return (
            <div className='Converter'>
                <input type='text'/>
                <button type="file">Choose Folder</button>
                <a href="/" download onClick={e => this.handleSubmit(e)}>Convert</a>
            </div>
        )
    }
}

export default Converter