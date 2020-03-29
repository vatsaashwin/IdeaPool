
import { useState, useEffect } from 'react'
import axios, { post } from 'axios'

const ProjectCreateform = (props) => {

    const [isInitialDataLoaded, setInitialDataLoaded] = useState(false)

    const { userDeets } = props

    // console.log("\n\n\nsgsdfgsdg", userDeets)

    const defaultData = {
        userID: userDeets.name,
        name: '',
        description: '',
        spots: 0,
        longDesc: '',
        image: '',
        email: '',
        cover: ''
    }
    const formData = props.initialData ? { ...props.initialData } : defaultData

    // console.log("\n\n\n formData", formData)


    const [form, setform] = useState(formData)

    const handleChange = (event) => {
        const target = event.target
        const name = target.name

        setform({
            ...form,
            [name]: target.value
        })
    }

    const handleGenreChange = (event) => {
        const { options } = event.target
        const optionsLength = options.length
        let value = []

        for (let i = 0; i < optionsLength; i++) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }

        setform({
            ...form,
            tech: value.toString()
        })

    }

    const submitform = () => {
        props.handleFormSubmit({ ...form })
    }

    const handleFile = (e) => {

    }


    return (

        <form>
            <div>
                <div className="form-group">

                    <label for="name">Name
                    {/* {user.name} */}
                    </label>

                    <input
                        onChange={handleChange}
                        value={form.name}
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        placeholder="Facebook" />
                </div>
                <div className="form-group">
                    <label for="description">Description</label>
                    <input
                        onChange={handleChange}
                        name="description"
                        value={form.description}
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="A social media website..." />
                </div>
                <div className="form-group">

                    <label for="spots">Spots left to join:</label>

                    <input
                        onChange={handleChange}
                        value={form.spots}
                        name="spots"
                        type="number"
                        className="form-control"
                        id="spots"
                        aria-describedby="Team Members Required"
                        placeholder="1, 2, 3..." />
                </div>

                <div className="form-group">
                    <label for="email">E-mail</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        value={form.email}
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="abc@xyz.com" />
                </div>

                <div className="form-group">
                    <label for="image">Image URL (<a href="https://unsplash.com/" target="_blank">Look up</a>)</label>
                    <label for="image" className="info-label">To add a URL here: Click on Look up>Select an image acc. to the theme of your project> Right click on the image> Open Image in New Tab > Copy the URL and paste it below. </label>

                    <input
                        onChange={handleChange}
                        name="image"
                        value={form.image}
                        type="text"
                        className="form-control"
                        id="image"
                        placeholder="Paste the link for image here" />
                    <label for="image" className="info-label">This will be displayed on the project card. </label>

                </div>
                <div className="form-group">
                    <label for="cover">Carousel cover image URL (<a href="https://unsplash.com/" target="_blank">Look up</a>)</label>
                    <input
                        onChange={handleChange}
                        name="cover"
                        value={form.cover}
                        type="text"
                        className="form-control"
                        id="cover"
                        placeholder="http://......" />
                    <label for="image" className="info-label">This will be displayed in the Carousel.</label>
                </div>
                <div className="form-group">
                    <label for="longDesc">Long Description</label>
                    <textarea
                        onChange={handleChange}
                        name="longDesc"
                        value={form.longDesc}
                        className="form-control"
                        id="longDesc"
                        rows="3"></textarea>
                </div>
                {/* <div className="form-group">
                    <label for="prototype">Additional details/prototypes:</label>

                    <input
                        onChange={(e) => handleFile(e)}
                        name="file"
                        value={form.cover}
                        type="file"
                        className="form-control"
                        id="file"
                        placeholder="Choose file" />
                </div> */}
                <div className="form-group">
                    <label for="tech">Technical Stack</label>
                    <select
                        onChange={handleGenreChange}
                        multiple className="form-control"
                        id="tech">
                        {/* <option></option> */}
                        <option>HTML/CSS</option>
                        <option>Pthon</option>
                        <option>Java</option>
                        <option>JavaScript</option>
                        <option>MySQL</option>
                        <option>MongoDB</option>
                        <option>C#/.Net</option>
                        <option>PHP</option>
                        <option>Ruby on Rails</option>
                        <option>Node.js</option>
                        <option>React.js</option>
                    </select>
                </div>

                <button
                    onClick={submitform}
                    type="button"
                    className="btn btn-primary">
                    {props.submitButton || 'Create'}
                </button>
                {/* <div className="col-lg-9">
                    
                </div> */}
                <div className="form-group">
                    <blockquote class="blockquote">
                        {/* <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p> */}
                        {form.userID && <footer class="blockquote-footer text-info">By <cite title="Source Title">{form.userID}</cite></footer>}
                        {/* {userDeets.name && <p className="text-right">Created By {userDeets.name}</p>} */}
                    </blockquote>
                </div>

                <style jsx>{`
        .info-label {
            font-size: 10px;
        }
        .align-div{
            float: right;
        }
        `}
                </style>
            </div>
        </form >
    )
}

// class User extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             user: '',
//         }
//         // const { user } = this.props.auth

//     }

//     render() {
//         // const { user } = this.props.auth
//         console.log("fdsfsdfds", props)

//         return (
//             <div>
//                 <p>vjhvhjvjh</p>
//                 {/* {this.user.name && <p className="text-right">Welcome, {this.user.name}</p>} */}
//             </div>
//         )
//     }
// }

export default ProjectCreateform