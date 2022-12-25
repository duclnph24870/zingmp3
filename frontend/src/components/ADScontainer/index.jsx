import PropTypes from 'prop-types';
import Button from '../Button';
import './ADScontainer.scss';

function ADScontainer ({
    className,
    title,
    textBtn,
    background,
    backgroundBtn,
    colorBtn,
    ...props
}) {
    return (  
        <div className="adsContainer" {...props} style={{
            background: background
        }}>
            <p className="adsContainer-text">{title}</p>
            <button className='adsContainer-btn' style={{
                background: backgroundBtn,
                color: colorBtn
            }}>{textBtn}</button>
        </div>
    );
}

ADScontainer.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    textBtn: PropTypes.string,
    background: PropTypes.string,
    backgroundBtn: PropTypes.string,
    colorBtn: PropTypes.string
}

export default ADScontainer;