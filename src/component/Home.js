import videoHomePage from '../assest/video-homepage.mp4'
import './Home.scss'

const Home = (props) => {

    return (
        <>
            <div className='home-container'>
                <video autoPlay muted loop>
                    <source src={videoHomePage}
                            type="video/mp4"
                    />
                </video>
            </div>
        </>
    )
};

export default Home;