import PropTypes from 'prop-types';
import '../SectionContent.scss';

function SectionContentItem ({
    style,
    className = '',
    data,
    option,
    onClick = () => {},
    playlist = false,
}) {
    return (  
        <div style={style} className={`sectionContentItem ${className}`}>
            <div className="sectionContentItem-img" style={{
                backgroundImage: `url(${data.image})`
            }}>
                <div className="sectionContentItem-overlay">
                    {
                        !option
                        ?
                        <button onClick={onClick}>
                            <i className='icon action-play ic-svg-play-circle'></i>
                        </button>
                        :
                        option
                    }
                </div>
            </div>

            <div className="sectionContentItem-main">
                <h3 className="sectionContentItem-title">{data.title}</h3>
                <span className="sectionContentItem-author">{data.author}</span>
            </div>
        </div>
    );
}

SectionContentItem.propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    playlist: PropTypes.bool,  
    onClick: PropTypes.func,
}

export default SectionContentItem ;