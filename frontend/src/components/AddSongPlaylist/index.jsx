import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlaylist } from '../../service/playlist';
import { changeModal } from '../../store/actions/appActions';
import './AddSongPlaylist.scss';
import CreatePlaylist from '../CreatePlaylist';
import { Skeleton, Space, Spin } from 'antd';
import request from '../../utils/axios';
import { toast } from 'react-toastify';

function AddSongPlaylist ({
    idSong,
    mainController = false,
}) {
    const [playlistData,setPlaylistData] = useState([]);
    const [idLoading,setIdLoading] = useState('');
    const dispatch = useDispatch();
    if (mainController) {
        let songSetting = useSelector(state => state.appReducer.songSetting);
        idSong = songSetting.idSong;
    }
    useEffect(() => {
        ( async () => {
            const result = await selectPlaylist('/playlist/all?idUser='+ localStorage.getItem('idUser'));

            if (result.message) {
                return;
            }
            setPlaylistData(result);
        } )();
    },[]);

    const handleClickAddPlaylist = async (id)  => {
        setIdLoading(id);
        try {
            const result = await request.post('/playlist/action/'+id, {
                action: 'add',
                idSong: id
            });

            setIdLoading('');
            if(result.errCode === 0) {
                toast.success(result.message);
                dispatch(changeModal({
                    isActive: false,
                    Component: null,
                }));
            }else if (result.errCode === 1) {
                toast.warn(result.message);
            }
        } catch (error) {
            console.log(error);
            setIdLoading('');
        }
    }

    return (
        <div className="addSongPlaylist">
            {
                playlistData
                &&
                <div className="addSongPlaylist">
                    <div className="addSongPlaylist-item createPlaylist" onClick={() => {
                        dispatch(changeModal({
                            isActive:true,
                            Component: <CreatePlaylist />
                        }));
                    }}>
                        <div className="addSongPlaylist-icon"><i className='icon ic- z-ic-svg ic-svg-add'></i></div>
                        <span>Tạo mới playlist</span>
                    </div>
                    {
                        playlistData.length === 0
                        ?
                        <div className='skeletonAddSongPlaylist'>
                            <Space>
                                <Skeleton.Button className='skeletonButton' active={true} />
                                <Skeleton.Input active={true} />
                            </Space>
                            <Space>
                                <Skeleton.Button className='skeletonButton' active={true} />
                                <Skeleton.Input active={true} />
                            </Space>
                            <Space>
                                <Skeleton.Button className='skeletonButton' active={true} />
                                <Skeleton.Input active={true} />
                            </Space>
                        </div>
                        :
                        playlistData.map(item => (
                            <div className="addSongPlaylist-item" key={item._id} onClick={() => handleClickAddPlaylist(item._id)}>
                                <div className="addSongPlaylist-icon"><i className='icon ic-list-music'></i></div>
                                <span>{item.name}</span>
                                { idLoading === item._id && <Spin className='addSongPlaylist-spin'/> }
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default AddSongPlaylist;