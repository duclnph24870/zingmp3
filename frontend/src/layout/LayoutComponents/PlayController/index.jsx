import PropTypes from 'prop-types';
import { useEffect,memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SongItem from '../../../components/SongItem';
import { getSongById } from '../../../service/songService';
import ControllerPlayerCenter from './ControllerPlayerCenter';
import './PlayController.scss';

function PlayController({
    className = '',
}) {

    const [songData,setSongData] = useState({});
    const songCurrData = useSelector(state => state.appReducer.songPlaying);
    useEffect(() => {
        getSongById(songCurrData.songId)
            .then(res => {
                setSongData(res.song);
            })
            .catch(err => {
                toast.error('Lỗi server');
            })
    },[songCurrData.songId]);

    return ( 
        <div className={`playController ${className}`}>
            <div className='playController-left'>
                <SongItem 
                    className='songItem-controller'
                    title={songData.name}
                    id={songData._id}
                    author={'Ngọc Đức'}
                    userUpload="Ngọc Đức"
                    image={songData.image}
                    controller
                />
            </div>
            <div className='playController-center'>
                <ControllerPlayerCenter songData={songData} songCurrData={songCurrData}/>
            </div>
            <div className='playController-right'>right</div>
        </div>
    );
}

PlayController.propTypes = {
    className: PropTypes.string,
}

export default memo(PlayController);