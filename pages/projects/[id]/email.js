import React from 'react';
import axios from 'axios';
import { getProjectById, updateProject } from '../../../actions'

class Email extends React.Component {

    static async getInitialProps({ query }) {
        const project = await getProjectById(query.id)
        return { project }
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            recipient: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:3000/send",
            data: this.state
        }).then((response) => {
            if (response.data.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        }).catch((err) => { console.log(err) })
    }

    resetForm() {

        this.setState({ name: '', email: '', message: '' })
    }

    render() {
        // const { user } = this.props.auth
        const { project } = this.props

        // this.setState({ recipient: project.email })

        // console.log('\n\n\n\dsfdsfd', { project })
        return (
            <div className="container" {...this.props}>
                <form id="contact-form " className="container jumbotron p-8" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="col-sm-8"><h3 className="display-5">Request to Collaborate:</h3>
                        <br />
                        {project.email && <label className="text-secondary float-right" htmlFor="Project Owner's Email">[Recipient: {this.state.recipient = project.email}]</label>}</div>

                    <div className="col-sm-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                    </div><br />
                    <div className="col-sm-8">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="id@example.com" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </div><br />
                    <div className="col-sm-8">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message" placeholder="Write something to us." value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                    </div><br />
                    <div className="col-sm-8"><button type="submit" className="btn btn-primary">Submit</button></div>
                </form>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onMessageChange(event) {
        this.setState({ message: event.target.value })
    }
}

export default Email;