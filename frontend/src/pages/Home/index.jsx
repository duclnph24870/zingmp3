import images from "../../assets/images";
import SliderComponent from "../../components/Slider";
import './Home.scss';

function Home() {
    const dataSlider = [
        {
            link: '/',
            image: images.slider1,
        },
        {
            link: '/',
            image: images.slider2,
        },
        {
            link: '/',
            image: images.slider3,
        },
        {
            link: '/',
            image: images.slider4,
        },
        {
            link: '/',
            image: images.slider5,
        },
        {
            link: '/',
            image: images.slider6,
        },
    ];
    return (
        <div className="pageContainer">
            <SliderComponent className="homePage-slider" data={dataSlider}/>
        </div>
    );
}

export default Home;