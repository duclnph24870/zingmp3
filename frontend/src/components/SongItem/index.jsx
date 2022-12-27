import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './SongItem.scss';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Section } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { changeModal, changeSongSetting } from '../../store/actions/appActions';
import ListComment from '../ListComment';
import images from '../../assets/images';
import { toast } from 'react-toastify';
import request from '../../utils/axios';
import { getUser } from '../../service/user';
import { changeUserSignIn } from '../../store/actions/userActions';

function SongItem ({
    className = '',
    title,
    id,
    playing,
    pause,
    controller,
    author,
    userUpload,
    image,
    timeLength,
    name,
    checkLike = false,
    setSongCurr,
    mainController = false
}) {
    let Component = NavLink;
    if (controller) {
        Component = 'div';
    }
    const [isActiveOpt,setActiveOpt] = useState(false);
    const dispatch = useDispatch();
    const userSignIn = localStorage.getItem('idUser');

    let dataOption = [
        { title: "Thêm vào playlist",icon: <i className='icon ic-16-Add'></i> },
        { 
            title: "Bình luận",
            icon: <i className='icon ic-comment'></i>,
            events: {
                onClick: () => {
                    setActiveOpt(false);
                    dispatch(changeModal({
                        isActive: true,
                        Component: <ListComment mainController={mainController} idSong={id}/>
                    }));
                }
            }
        },
        { title: "Sao chép link",icon: <i className='icon ic-link'></i> },
        { title: "Chia sẻ",icon: <i className='icon ic-share'></i> },
    ];

    const handleOptionClick = () => {
        setActiveOpt(curr => !curr);
    }

    const handleClickSong = () => {
        setSongCurr(id);
    }

    const handleClickBtnLike = async e => {
        if (userSignIn && userSignIn.length > 0) {
            if (checkLike) {
                const result = await request.post(`/song/like/${id}?type=unlike`);
            }else {
                const result = await request.post(`/song/like/${id}?type=like`);
            }

            const newUser = await getUser();
            dispatch(changeUserSignIn(newUser.user));
        }else {
            toast.warn("Bạn cần đăng nhập để sử dụng chức năng này");
        }
    }

    return (  
        <Component name={name} className={`songItem ${className} ${playing ? 'playing' : ''} ${pause ? 'pause' : ''} ${controller ? 'controller' : ''}`}>
            <div onClick={handleClickSong} className='songItem-img'>
                <img src={image} alt=""/>
                {
                    playing
                    &&
                    <div className='songItem-img-overlay'>
                        {
                            pause
                                ?
                            <i className="icon action-play ic-play"></i>
                                :
                            <img src={images.playingIcon} className="icon" alt="payingIcon" />
                        }
                    </div>
                }
            </div>

            <div onClick={handleClickSong} className='songItem-content'>
                <h1 className='songItem-title'>
                    <span className='songItem-title-text'>
                        {title}
                    </span>
                    
                    <i title={userUpload} className='songItem-userUpload icon ic-global'></i>
                </h1>
                <span className='songItem-author'>{author}</span>
            </div>

            <div className='songItem-option'>
                <div className='songItem-defaultOp'>
                    <span className='songItem-timeLength'>{timeLength}</span>
                </div>
                <div className='songItem-hover'>
                    <span className={`songItem-likeBtn ${checkLike ? "active" : ''}`} onClick={handleClickBtnLike}>
                        <i className={`${checkLike ? 'icon ic-like-full' : 'icon ic-like'}`}></i>
                    </span>
                    <Tippy
                        visible={isActiveOpt}
                        onClickOutside={() => setActiveOpt(false)}
                        interactive
                        render={() => (
                            <Section 
                                className='section-controller barNone'
                                sectionModal
                                data={dataOption}
                            />
                        )}
                    >
                        <span className={`songItem-showOptBtn ${isActiveOpt ? 'active' : ''}`} onClick={handleOptionClick}>
                            <i className='icon ic-more'></i>
                        </span>
                    </Tippy>
                </div>
            </div>

        </Component>
    );
}

SongItem.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    playing: PropTypes.bool,
    paused: PropTypes.bool,
    author: PropTypes.string,
    userUpload: PropTypes.string,
    image: PropTypes.string,
    controller: PropTypes.bool,
    timeLength: PropTypes.string,
    checkLike: PropTypes.bool,
    setSongCurr: PropTypes.func,
    mainController: PropTypes.bool
}

export default SongItem;