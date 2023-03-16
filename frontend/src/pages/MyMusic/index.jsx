import { Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, SectionContent } from '../../components';
import CreatePlaylist from '../../components/CreatePlaylist';
import SectionContentItem from '../../components/SectionContent/SectionContentItem';
import SongItem from '../../components/SongItem';
import { selectPlaylist } from '../../service/playlist';
import { time_distance_current2 } from '../../service/timeService';
import { changeLoading, changeModal } from '../../store/actions/appActions';
import request from '../../utils/axios';
import './MyMusic.scss';

function MyMusic () {
    const dispatch = useDispatch();
    const songPlaying = useSelector(state => state.appReducer);
    const songSetting = songPlaying.songSetting;

    const [dataPlaylist,setDataPlaylist] = useState([]);
    const [likedData,setLikedData] = useState([]);
    useEffect(() => {
        ( async () => {
            const result = await selectPlaylist('/playlist/all?idUser='+ localStorage.getItem('idUser'));
            if (result.message) {
                return;
            }

            const likeList = await request.get('/playlist/likedList'); 
            setLikedData(likeList.likedList);
            setDataPlaylist(result);
        } )();
    },[songPlaying]);

    const handleDeletePlaylist = async (id) => {
        dispatch(changeLoading(true))
        try {
            const result = await  request.post('/playlist/delete/'+id);

            dispatch(changeLoading(false));
            setDataPlaylist(dataPlaylist.filter(item => item._id !== result.id));
            toast.success(result.message);
        } catch (error) {
            dispatch(changeLoading(false));
            console.log(error);
        }
    }

    const handleEditPlaylist = async (id,name) => {
        dispatch(changeModal({
            isActive: true,
            Component: <CreatePlaylist id={id} edit={name}/>
        }))
    }
    return (  
        <div className="pageContainer myMusicPage">
            <h1 className="myMusicPage-title">
                <span className='title'>Thư Viện</span>
                <Button
                    buttonIcon
                    children={<i className='icon ic-play'></i>}
                />
            </h1>

            <div className="myMusicPage-content">
                {
                    dataPlaylist.length > 0 
                    &&
                    <SectionContent 
                        all={true}
                        title={
                            <div className='myMusicPage-playlist-title'>
                                <span>Playlist</span>
                                <i className='icon ic-add'
                                    onClick={() => {
                                        dispatch(changeModal({
                                            isActive: true,
                                            Component: <CreatePlaylist />
                                        }));
                                    }}
                                ></i>
                            </div>
                        }
                    >
                        {
                            dataPlaylist.map(item => (
                                <SectionContentItem 
                                    key={item._id}
                                    style={{
                                        "--width":`calc(100% / 5)`,
                                        "--gap":"14px"
                                    }}
                                    data={{
                                        image: item.image,
                                        title: item.name,
                                        author: item.idUser.userName
                                    }}
                                    option={
                                        <div className='myMusicPage-playlist-option'>
                                            <Popconfirm
                                                placement='top'
                                                title="Xóa playlist?"
                                                description="Playlist sẽ bị xóa vĩnh viễn không thể khôi phục lại"
                                                onText="Xóa"
                                                cancelText="Bỏ qua"
                                                onConfirm={() => handleDeletePlaylist(item._id)}
                                            >
                                                <i className='icon ic-close'></i>
                                            </Popconfirm>
                                            <button onClick={() => {alert(1)}}>
                                                <i className='icon action-play ic-svg-play-circle'></i>
                                            </button>
                                            <i className='icon ic-edit' onClick={() => handleEditPlaylist(item._id,item.name)}></i>
                                        </div>
                                    }
                                />
                            ))
                        }
                    </SectionContent>
                }

                <SectionContent title="Bài hát yêu thích">
                    <div className="myMusicPage-likedSong">
                        {
                            likedData.length === 0
                            ?
                                <div className="myMusicPage-emtySong">
                                    <div className="myMusicPage-emtySongIcon"></div>
                                    <span>Chưa có bài hát yêu thích nào</span>
                                </div>
                            :
                                likedData.map((item) => (
                                    <SongItem 
                                        key={item._id}
                                        title={item.name}
                                        id={item._id}
                                        author={item.idAuthor[0].name}
                                        userUpload={item.idUser}
                                        image={item.image}
                                        timeLength={"04:26"}
                                        name={item.name}
                                        createAt={time_distance_current2(item.createdAt)}
                                        checkLike={true}
                                        playing={songSetting.idSong === item._id}
                                        pause={!songSetting.isPlaying}
                                        dispatch={dispatch}
                                    />
                                ))
                        }
                    </div>
                </SectionContent>
            </div>
        </div>
    );
}

export default MyMusic ;