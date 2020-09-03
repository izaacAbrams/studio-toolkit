import React, {Component} from 'react'
class Converter extends Component {
    state = {
        title: null,
        embed: null
    }
    handleDownload(e) {
        e.preventDefault()
        const URL = `https://www.youtube.com/watch?v=IBDgHaTy_wU`
        window.location.href = `http://localhost:8000/download?URL=${URL}`;
    }

    getInfo() {
        return fetch(`http://localhost:8000/info?URL=https://www.youtube.com/watch?v=IBDgHaTy_wU`, {
            method: 'GET'
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log(document.querySelector('.Converter__input').value)
        this.getInfo().then(info => {
            this.setState({
                title: info.videoDetails.title,
                embed: info.videoDetails.embed.iframeUrl
            })
           
        })
    
    }

    render() {
        return (
            <div className='Converter'>
                <form onSubmit={e => this.handleSubmit(e)}>
                <input className="Converter__input" type='text'/>
                <button type="submit">Find Video</button>
                </form>
                {this.state.title ? this.state.title : <></>}
                {this.state.embed ? <iframe src={this.state.embed} title={this.state.title}/> : <></>}
                <a href="/" download onClick={e => this.handleDownload(e)}>Download</a>
            </div>
        )
    }
}

export default Converter