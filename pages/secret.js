import React from 'react'
import withAuth from '../components/hoc/withAuth'
import { getSecretData } from '../actions'
// import 

class Secret extends React.Component {

    static async getInitialProps({ req }) {
        const anotherSecretData = await getSecretData(req)
        // console.log("gjhghjgjhgjhg", anotherSecretData)
        return { anotherSecretData }
    }

    state = {
        secretData: []
    }


    async componentDidMount() {
        const res = await getSecretData()
        const secretData = res.data
        this.setState({
            secretData
        })
    }

    displaySecretData() {
        const { secretData } = this.state;

        if (secretData && secretData.length > 0) {
            return secretData.map((data, index) => {
                return (
                    <div key={index}>
                        <p> {data.title}</p>
                        <p> {data.description}</p>
                    </div>
                )
            })
        }

        return null;
    }


    render() {
        const { superSecretValue } = this.props

        return (
            < div className="container" {...this.props.auth} {...this.props.user}>
                <h1>I am secret page</h1>
                <p>Secret content here...</p>
                <h2>{superSecretValue}</h2>
                {this.displaySecretData()}
            </div >

        )
    }
}

export default withAuth(Secret)