import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components';
import { convertImage } from '../../../../service/app';
import { actionSong } from '../../../../service/songService';
import { convertTime } from '../../../../service/timeService';
import { changeLoading, changeSongSetting } from '../../../../store/actions/appActions';
import request from '../../../../utils/axios';
import './ControllerPlayerCenter.scss';

function ControllerPlayerCenter ({
    songSetting,
    songCurrData,
    idSong
}) {
    // các el cần sử dụng
    const audioRef = useRef();
    const rangeRef = useRef();
    const dispatch = useDispatch();

    // tạo 1 state để lưu dữ liệu render
    const [audioInformation, setAudioInformation] = useState({
        isPlaying: false,
        timeDuration: '--',
        timeCurr: null,
        rangeValue: 0,
        rePlay: songSetting.replay,
        randomPlay: songSetting.randomPlay,
    });

    const [isLoading,setIsLoading] = useState(true)

    // cập nhập tình trạng phát nhạc vào local
    useEffect(() => {
        dispatch(changeSongSetting({
            ... songSetting,
            replay: audioInformation.rePlay,
            randomPlay: audioInformation.randomPlay,
            isPlaying: audioInformation.isPlaying,
        }))
    }, [audioInformation.rePlay,audioInformation.randomPlay,audioInformation.isPlaying]);

    // Điều chỉnh âm lượng
    useEffect(() => {
        audioRef.current.volume = songSetting.volume;
    },[songSetting.volume])

    // xử lý giao diện input
    const renderRange = useCallback((value) => {
        rangeRef.current.style.backgroundSize = value + '% 100%';
    },[])
 
    // xử lý click nút play
    const handlePlayBtn = useCallback( (isPlaying) => {
        if (isPlaying) {
            audioRef.current.pause()
        }else {
            audioRef.current.play()
        }
    },[])

    // xử lý sự kiện play
    const handleAudioPlay = useCallback(e => {
        setAudioInformation(curr => ({...curr, isPlaying: true}))
    },[])

    // sự kiện pause
    const handleAudioPause = useCallback(e => {
        setAudioInformation(curr => ({
            ... curr,
            isPlaying: false,
        }))
    },[])

    // xử lý tua
    const handleChangeRange = useCallback(e => {
        audioRef.current.pause();
        let timeCurr = audioRef.current.duration / 100 * e.target.value;
        audioRef.current.currentTime = timeCurr;
        // let rangeValue = Math.floor( Number(el.currentTime) / Number(el.duration) * 100 );
        setAudioInformation(curr => ({
            ... curr,
            rangeValue: e.target.value
        }));
    },[])

    // tiến độ bài hát
    const handleTimeUpdate = useCallback(e => {
        let el = e.target;
        let timeCurr = convertTime(el.currentTime);
        let rangeValue = 0;
        if (el.duration) {
            rangeValue = Math.floor( Number(el.currentTime) / Number(el.duration) * 100 );
            renderRange(rangeValue);
        }

        setAudioInformation(curr =>({
            ... curr,
            timeCurr,
            rangeValue,
            timeDuration: convertTime(el.duration),
        }))
    },[])

    // kết thúc bài hát
    const handleEndedAudio = useCallback(e => {
        if (audioInformation.rePlay) {
            audioRef.current.currentTime = 0;
        }else {
            handleNextSong();
        }
    },[])
    
    // xử lý sự kiện next song
    const handleNextSong = useCallback(async () => {
        audioRef.current.pause();
        const data = await request.get('/song/songPlayList');
        const result = actionSong(songSetting.randomPlay,data,'next',songSetting.idSong);
        dispatch(changeSongSetting({
            ... songSetting,
            idSong: result._id
        }));
    },[])

    // xử lý pre song
    const handlePreSong = useCallback(async () => {
        audioRef.current.pause();
        const data = await request.get('/song/songPlayList');
        const result = actionSong(songSetting.randomPlay,data,'prev',songSetting.idSong);
        dispatch(changeSongSetting({
            ... songSetting,
            idSong: result._id
        }));
    },[])

    return (  
        <div className='controllerPayerCenter'>
            <audio 
                onPlay={handleAudioPlay} 
                onPause={handleAudioPause} 
                onTimeUpdate={handleTimeUpdate} 
                onEnded={handleEndedAudio}
                ref={audioRef} 
                src={songCurrData.audio && convertImage(songCurrData.audio)}
                onLoadStart={() => {
                    dispatch(changeLoading(true))
                    setIsLoading(true)
                }}
                onLoadedMetadata={e => {
                    handleTimeUpdate(e);
                    dispatch(changeLoading(false))
                    setIsLoading(false)
                }}
            ></audio>
            <div className='controllerPayerCenter-item controllerPayerCenter-btnBlock'>
                <Button 
                    title="Phát ngẫu nhiên" 
                    className={`controllerPlayerCenter-button ${audioInformation.randomPlay ? 'active' : ''}`} 
                    buttonIcon 
                    iconLeft={<i className='icon ic-shuffle'></i>}
                    onClick={() => {
                        setAudioInformation({
                            ... audioInformation,
                            randomPlay: !audioInformation.randomPlay,
                        })
                    }}
                ></Button>

                <Button 
                    disabled={idSong ? false : true} 
                    className='controllerPlayerCenter-button' 
                    buttonIcon 
                    iconLeft={<i className='icon ic-pre'></i>}
                    onClick={handlePreSong}
                >

                </Button>

                <Button 
                    disabled={isLoading}
                    className='controllerPlayerCenter-button playerBtn' 
                    buttonIcon 
                    iconLeft={
                        !audioInformation.isPlaying ? <i className='icon ic-play-circle-outline'></i> : <i className="icon ic-pause-circle-outline"></i>
                    }
                    onClick={e => handlePlayBtn(audioInformation.isPlaying)}
                ></Button>

                <Button 
                    disabled={idSong ? false : true}
                    className='controllerPlayerCenter-button' 
                    buttonIcon 
                    iconLeft={<i className='icon ic-next'></i>}
                    onClick={handleNextSong}
                ></Button>

                <Button 
                    title="Phát lại" 
                    className={`controllerPlayerCenter-button ${audioInformation.rePlay ? 'active' : ''}`} 
                    buttonIcon iconLeft={<i className='icon ic-repeat'></i>}
                    onClick={() => setAudioInformation({
                        ... audioInformation,
                        rePlay: !audioInformation.rePlay
                    })}
                ></Button>
            </div>
            <div className='controllerPayerCenter-item'>
                <span className='controllerPayerCenter-timeCurr controllerPayerCenter-time'>{ audioInformation.timeCurr ? audioInformation.timeCurr : '--' }</span>
                <div className='controllerPayerCenter-thumb'>
                    <input ref={rangeRef} type='range' value={audioInformation.rangeValue} min="0" step={1} max="100" onChange={handleChangeRange}/>
                </div>
                <span className='controllerPayerCenter-timeLength controllerPayerCenter-time'>{ audioInformation.timeDuration ? audioInformation.timeDuration : '--' }</span>
            </div>
        </div>
    );
}

ControllerPlayerCenter.propTypes = {
    className: PropTypes.string,
}

export default ControllerPlayerCenter;