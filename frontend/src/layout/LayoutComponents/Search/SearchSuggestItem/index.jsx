import PropTypes from 'prop-types';
import './SearchSuggestItem.scss';

function SearchSuggestItem({
    className = '',
    data,
}) {
    return (  
        <div className='searchSuggestItem'>
            <img src='https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/9/0/2/2/90223f08b220e52a78ac5c0dd739256f.jpg' alt='ass'/>
            <div className='searchSuggestItem__information'>
                <div className='searchSuggestItem__name'>{data.name}</div>
                <div className='searchSuggestItem__label'>{data.type}</div>
            </div>
        </div>
    );
}

SearchSuggestItem.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object
}

export default SearchSuggestItem;