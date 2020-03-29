import React from 'react'
import auth0Client from '../services/auth0'
import { withRouter } from 'next/router'


class Callback extends React.Component {

    async componentDidMount() {
        await auth0Client.handleAuthentication()
        this.props.router.push('/')
    }

    render() {
        return (
            <div className="container" align="centre">
                {/* <iframe src="https://giphy.com/embed/UEcMrzIAnwiCk" width="365" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/loop-video-buffering-UEcMrzIAnwiCk">via GIPHY</a></p> */}
                <h1>logging in...</h1>
            </div>
        )
    }
}

export default withRouter(Callback)