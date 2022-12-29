import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Button from '../Button';

function SliderComponent ({
    className = '',
    data,
}) {
    const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
        <Button {...props} buttonIcon children={<i className='icon ic-go-right'></i>}></Button>
    );

    const SlickButtonFixPrev = ({ currentSlide, slideCount, children, ...props }) => (
        <Button {...props} buttonIcon children={<i className='icon ic-go-left'></i>}></Button>
    );
    const setting = {
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: true,
        nextArrow: <SlickButtonFix />,
        prevArrow: <SlickButtonFixPrev />
    }
    return (  
        <Slider {...setting} className={`slider ${className}`}>
            {
                data 
                &&
                data.map((item, index) => {
                    return (
                        <div className='sliderItem' key={index}>
                            <img src={item.image} alt="" />
                        </div>
                    )})
            }
        </Slider>
    );
}

Slider.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
}

export default SliderComponent;