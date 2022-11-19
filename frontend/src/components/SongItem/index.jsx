import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './SongItem.scss';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { Section } from '..';
import { useDispatch } from 'react-redux';
import { changeModal } from '../../store/actions/appActions';
import ListComment from '../ListComment';

function SongItem ({
    className = '',
    title,
    id,
    controller,
    author,
    userUpload,
    image,
    timeLength,
}) {
    let Component = NavLink;
    if (controller) {
        Component = 'div';
    }
    const [isActiveOpt,setActiveOpt] = useState(false);
    const dispatch = useDispatch();

    const dataOption = [
        { title: "Thêm vào playlist",icon: <i className='icon ic-16-Add'></i> },
        { 
            title: "Bình luận",
            icon: <i className='icon ic-comment'></i>,
            events: {
                onClick: () => {
                    setActiveOpt(false);
                    dispatch(changeModal({
                        isActive: true,
                        Component: <ListComment idSong={id}/>
                    }))
                }
            }
        },
        { title: "Sao chép link",icon: <i className='icon ic-link'></i> },
        { title: "Chia sẻ",icon: <i className='icon ic-share'></i> },
    ];

    const handleOptionClick = () => {
        setActiveOpt(curr => !curr);
    }

    return (  
        <Component className={`songItem ${className} ${controller ? 'controller' : ''}`}>
            <div className='songItem-img'>
                <img src={image} alt=""/>
            </div>

            <div className='songItem-content'>
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
                    <span className='songItem-likeBtn'>
                        <i className='icon ic-like'></i>
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
    author: PropTypes.string,
    userUpload: PropTypes.string,
    image: PropTypes.string,
    controller: PropTypes.bool,
    timeLength: PropTypes.string,
}

export default SongItem;