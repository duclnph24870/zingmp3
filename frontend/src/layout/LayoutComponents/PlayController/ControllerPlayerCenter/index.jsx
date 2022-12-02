import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSongPlaying } from '../../../../store/actions/appActions';
import { Button } from '../../../../components';
import { convertTime } from '../../../../service/timeService';
import './ControllerPlayerCenter.scss';

function ControllerPlayerCenter ({
    className = '',
    songCurrData

}) {
    // các el cần sử dụng
    const audioRef = useRef();
    const rangeRef = useRef();

    // tạo 1 state để lưu dữ liệu render
    const [audioInformation, setAudioInformation] = useState({
        isPlaying: false,
        timeDuration: null,
        timeCurr: null,
        rangeValue: 0,
        rePlay: songCurrData.replay,
        randomPlay: songCurrData.randomPlay,
    });

    const dispatch = useDispatch();

    // cập nhập tình trạng phát nhạc vào local
    useEffect(() => {
        dispatch(changeSongPlaying({
            ... songCurrData,
            replay: audioInformation.rePlay,
            randomPlay: audioInformation.randomPlay,
        }))
    }, [audioInformation.rePlay,audioInformation.randomPlay]);

    // xử lý giao diện input
    const renderRange = (value) => {
        rangeRef.current.style.backgroundSize = value + '% 100%';
    }
 
    // xử lý click nút play
    const handlePlayBtn = e => {
        audioInformation.isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setAudioInformation({
            ... audioInformation,
            timeDuration: convertTime(audioRef.current.duration)
        })
    }

    // xử lý sự kiện play
    const handleAudioPlay = e => {
        setAudioInformation({
            ... audioInformation,
            isPlaying: true,
        })
    }

    // sự kiện pause
    const handleAudioPause = e => {
        setAudioInformation({
            ... audioInformation,
            isPlaying: false,
        })
    }

    // xử lý tua
    const handleChangeRange = e => {
        audioRef.current.pause();
        let timeCurr = audioRef.current.duration / 100 * e.target.value;
        audioRef.current.currentTime = timeCurr;
        // let rangeValue = Math.floor( Number(el.currentTime) / Number(el.duration) * 100 );
        setAudioInformation({
            ... audioInformation,
            rangeValue: e.target.value
        });
    }

    // tiến độ bài hát
    const handleTimeUpdate = e => {
        let el = e.target;
        let timeCurr = convertTime(el.currentTime);
        let rangeValue = null;
        if (el.duration) {
            rangeValue = Math.floor( Number(el.currentTime) / Number(el.duration) * 100 );
            renderRange(rangeValue);
        }

        setAudioInformation({
            ... audioInformation,
            timeCurr,
            rangeValue,
        })
    }

    // kết thúc bài hát
    const handleEndedAudio = e => {
        if (audioInformation.rePlay) {
            audioRef.current.currentTime = 0;
        }else {
            alert('hết bài')
        }
    }
    
    // xử lý sự kiện next song
    const handleNextSong = (e) => {
        let random = Math.floor(Math.random() * 10)
    }

    return (  
        <div className='controllerPayerCenter'>
            <audio 
                onPlay={handleAudioPlay} 
                onPause={handleAudioPause} 
                onTimeUpdate={handleTimeUpdate} 
                onEnded={handleEndedAudio}
                ref={audioRef} 
                src={songCurrData.audio}
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

                <Button className='controllerPlayerCenter-button' buttonIcon iconLeft={<i className='icon ic-pre'></i>}></Button>

                <Button 
                    className='controllerPlayerCenter-button playerBtn' 
                    buttonIcon 
                    iconLeft={
                        !audioInformation.isPlaying ? <i className='icon ic-play-circle-outline'></i> : <i className="icon ic-pause-circle-outline"></i>
                    }
                    onClick={handlePlayBtn}
                ></Button>

                <Button 
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