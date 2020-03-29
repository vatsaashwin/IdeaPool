import React from 'react'

export default function (Component) {
    return class withAuth extends React.Component {

        static async getInitialProps(args) {
            const pageprops = await Component.getInitialProps && await Component.getInitialProps(args)

            return { ...pageprops }
        }
        renderProtectedPage() {
            const { isAuthenticated } = this.props.auth
            if (isAuthenticated) {
                return (
                    <Component {...this.props} />
                )
            } else {
                return (< div className="container" {...this.props.auth} {...this.props.user}>
                    <div className="alert alert-danger" role="alert">You are not authenticated. Please login to access this page.</div>
                </div >)

            }
        }

        render() {

            return this.renderProtectedPage()
        }
    }
}