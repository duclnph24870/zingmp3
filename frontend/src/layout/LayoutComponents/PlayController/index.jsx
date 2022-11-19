import PropTypes from 'prop-types';
import SongItem from '../../../components/SongItem';
import './PlayController.scss';

function PlayController({
    className = '',
}) {

    // fake data songPlaying
    const songPlayingData = {

    }

    return ( 
        <div className={`playController ${className}`}>
            <div className='playController-left'>
                <SongItem 
                    className='songItem-controller'
                    title={'Tháng 5 không trở lại'}
                    id="1"
                    author={'Ngọc Đức'}
                    userUpload="Ngọc Đức"
                    image={'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg'}
                    timeLength="4:25"
                    controller
                />
            </div>
            <div className='playController-center'>center</div>
            <div className='playController-right'>right</div>
        </div>
    );
}

PlayController.propTypes = {
    className: PropTypes.string,
}

export default PlayController;