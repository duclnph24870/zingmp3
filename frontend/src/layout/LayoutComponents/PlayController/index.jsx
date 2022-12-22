import PropTypes from 'prop-types';
import { useEffect,memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SongItem from '../../../components/SongItem';
import { getSongById } from '../../../service/songService';
import { changeSongPlaying } from '../../../store/actions/appActions';
import ControllerPlayerCenter from './ControllerPlayerCenter';
import './PlayController.scss';

function PlayController({
    className = '',
}) {

    const dispatch = useDispatch();
    const { songSetting,songPlaying } = useSelector(state => state.appReducer);
    const idSong = songSetting.idSong;
    useEffect(() => {
        (async () => {
            if (idSong) {
                const { song } = await getSongById(idSong);
                dispatch(changeSongPlaying(song[0]));
            }
        })();
    },[idSong]);

    return ( 
        <div className={`playController ${className}`}>
            <div className='playController-left'>
                <SongItem 
                    className='songItem-controller'
                    title={(songPlaying.name ?? songPlaying.name) || 'Chọn bài hát'}
                    id={(songPlaying._id && songPlaying._id)}
                    author={(songPlaying.idAuthor && songPlaying.idAuthor[0].name) || '---'}
                    userUpload={(songPlaying.idUser && songPlaying.idUser.userName) || '---'}
                    image={(songPlaying.image && songPlaying.image) || "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"}
                    controller
                />
            </div>
            <div className='playController-center'>
                <ControllerPlayerCenter songCurrData={songPlaying} songSetting={songSetting}/>
            </div>
            <div className='playController-right'>right</div>
        </div>
    );
}

PlayController.propTypes = {
    className: PropTypes.string,
}

export default memo(PlayController);