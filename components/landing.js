import image from '../resources/images/landing.jpg'


class Landing extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="landing-pic" >

                    <img src={image} className="img-fluid" alt="Responsive image" />


                    <style jsx>{`
                    .landing-pic {
                        background: no-repeat ;
                        height: auto;
                        width: 100% ;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        opacity: 0.8;
                        // margin-top: -50px;    
                    }
                    
                `}
                    </style>
                </div></div>

        )
    }
}

export default Landing
