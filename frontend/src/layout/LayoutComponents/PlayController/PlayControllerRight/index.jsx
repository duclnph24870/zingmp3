import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PlayControllerRight.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { changeSongSetting } from '../../../../store/actions/appActions';
import { Drawer } from 'antd';
import SongItem from '../../../../components/SongItem';
import request from '../../../../utils/axios';
import { toast } from 'react-toastify';
import { checkLiked } from '../../../../service/songService';

const cx = classNames.bind(styles);

function PlayControllerRight({
    className
}) {
    const {appReducer,userReducer} = useSelector(state => state);
    const songSetting = appReducer.songSetting;
    const likedList = userReducer.user.liked;
    const [playListData,setPlayListData] = useState([]);
    const [volume, setVolume] = useState(songSetting.volume);
    const [isOpened, setIsOpened] = useState(false);
    const dispatch = useDispatch();
    const deboundVolume = useDebounce(800,volume);

    const handleVolumeChange = e => {
        setVolume(+e.target.value);
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await request.get('http://localhost:3131/song/songPlayList');
                setPlayListData(data);
            } catch (error) {
                console.log(error);
                toast.error('Lỗi server,vui lòng thử lại');
            }
        })();
    },[]);

    useEffect(() => {
        dispatch(changeSongSetting({
            ...songSetting,
            volume: deboundVolume
        }));
    },[deboundVolume]);
    
    // xử lý click thay đổi bài hát
    const handleSetSongCurr = id => {
        if (id === songSetting.idSong) {
            return undefined;
        }
        dispatch(changeSongSetting({
           ...songSetting,
            idSong: id
        }));
    }

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('item')} title='MV'>
                <i className='icon ic-mv'></i>
            </div>
            <div className={cx('item')} title='Lời bài hát'>
                <i className='icon ic-karaoke'></i>
            </div>
            <div className={cx('item',{volumeItem:true})} title='Âm lượng'>
                <i onClick={e => setVolume(0)} className={volume === 0 ? 'icon ic-volume-mute' : 'icon ic-volume'}></i>
                <div className={cx("volume")}>
                    <input type='range' min="0" style={{backgroundSize: `${volume*100}% 100%`}} value={volume} step={0.01} max="1" onChange={handleVolumeChange}/>
                </div>
            </div>
            <div className={cx('gap')}>
                <span></span>
            </div>
            <div className={cx('listSong',{
                item: true,
                active: isOpened
            })} title='Lời bài hát' onClick={() => setIsOpened(!isOpened)}>
                <i className="icon ic-list-music"></i>
            </div>

            <Drawer
                title="Danh sách phát"
                closable={false}
                onClose={() => setIsOpened(false)}
                open={isOpened}
                placement='right'
                key={'right'}
                mask={false}
                zIndex={1}

            >
                <div className={cx("playListSong")}>
                    {
                        playListData 
                            &&
                            playListData.map((item, index) => {
                                return (

                                    <SongItem 
                                        key={item._id}
                                        name={'songItem'}
                                        playing={songSetting.idSong === item._id}
                                        pause={!songSetting.isPlaying}
                                        title={item.name}
                                        controller
                                        id={item._id}
                                        author={item?.idAuthor[0]?.name}
                                        userUpload={item.idUser}
                                        image={item.image}
                                        checkLike={checkLiked(item._id,likedList)}
                                        setSongCurr={handleSetSongCurr}
                                />
                            )})
                    }
                
                </div>
            </Drawer>
        </div>
    );
}

PlayControllerRight.propTypes = {
    className: PropTypes.string
};

export default PlayControllerRight;