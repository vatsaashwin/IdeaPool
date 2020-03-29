
import { useRouter } from 'next/router'
import { getProjectById, deleteProject } from '../../../actions'
import Link from 'next/link'
import Email from './email'

const Project = (props) => {
    const router = useRouter()
    const { id } = router.query
    const { project } = props
    // const { user } = props.user

    const handleDeleteProject = (id) => {
        deleteProject(id).then(() => {
            // Handle later
            router.push('/')
        })
    }

    return (
        <div className="container" {...props.auth} {...props.user}>
            <div className="jumbotron p-6">
                {/* {project.name = 'epsilon' && <Email auth={...props.auth} user={...props.user} />} */}
                <h1 className="display-2">{project.name}</h1>
                <p className="lead">{project.description}</p>
                <p><b>Required Skills: </b>{project.tech}</p>
                <p> Request to Collab at: {project.email ? project.email : 'Email not provided'} </p>
                <hr className="my-4" />

                {project.userID != project.email && <Link href="/projects/[id]/email" as={`/projects/${id}/email`} >
                    < button className="btn btn-secondary btn-sm mr-4 px-4 " href="#" role="button">Send Request</button>
                </Link>}

                {project.userID == project.email && <Link href="/projects/[id]/edit" as={`/projects/${id}/edit`} >
                    <button
                        className="btn btn-info btn-sm mr-4 px-5 "
                        role="button">Edit</button>
                </Link>}
                {project.userID == project.email && <button onClick={() => handleDeleteProject(id)} className="btn btn-danger btn-sm mr-4 px-5 " href="#" role="button">Delete</button>}


            </div>
            <p className="text-secondary text-right">Spots left on the team: {project.spots}</p>
            <p className="desc-text">{project.longDesc}</p>
            <p className="text-secondary text-right">{project.userID}</p>

            <style jsx>{`
                .desc-text {
                font-size: 21px;
                }
                .info-p{
                    font-size: 15px;
                    padding: 20px
                }
            `}
            </style>
        </div >
    )
}

Project.getInitialProps = async ({ query }) => {
    const project = await getProjectById(query.id)

    return { project }
}

export default Project