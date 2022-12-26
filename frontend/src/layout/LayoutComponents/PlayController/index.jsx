import PropTypes from 'prop-types';
import { useEffect,memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongItem from '../../../components/SongItem';
import { checkLiked, getSongById } from '../../../service/songService';
import { changeSongPlaying } from '../../../store/actions/appActions';
import ControllerPlayerCenter from './ControllerPlayerCenter';
import './PlayController.scss';
import PlayControllerRight from './PlayControllerRight';

function PlayController({
    className = '',
}) {
    // lấy ra likedList user
    const likedList = useSelector((state) => state.userReducer.user).liked;
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
                    checkLike={checkLiked(songPlaying._id,likedList)}
                />
            </div>
            <div className='playController-center'>
                <ControllerPlayerCenter songCurrData={songPlaying} idSong={idSong} songSetting={songSetting}/>
            </div>
            <div className='playController-right'>
                <PlayControllerRight />
            </div>
        </div>
    );
}

PlayController.propTypes = {
    className: PropTypes.string,
}

export default memo(PlayController);