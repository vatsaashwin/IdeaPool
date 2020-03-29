
import React from 'react'
import ProjectCreateForm from '../../../components/projectCreateForm'
import { getProjectById, updateProject } from '../../../actions'
import Router from 'next/router'

class EditProject extends React.Component {

    static async getInitialProps({ query }) {
        const project = await getProjectById(query.id)
        return { project }
    }

    handleUpdateProject = (project) => {
        updateProject(project).then((updatedProject) => {
            Router.push('/projects/[id', `/projects/${project.id}`)
        })
    }

    render() {
        const { project } = this.props
        return (
            <div {...this.props.auth} {...this.props.user}>
                <div className="container">
                    <h1 className="h1-padding">Edit the Project</h1>
                    <ProjectCreateForm
                        submitButton="Update"
                        initialData={project}
                        handleFormSubmit={this.handleUpdateProject}
                        userDeets={this.props.user} />
                </div>
                <style jsx>{`
            .h1-padding {
            padding: 20px 0px;
            }
        `}</style></div>
        )
    }
}

export default EditProject