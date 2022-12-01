import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../../../assets/images';
import { changeModal } from '../../../../store/actions/appActions'
import { Button, Section } from '../../../../components';
import Tippy from '@tippyjs/react/headless';
import '../Header.scss';
import { ThemeModal,AuthForm } from '../../../../components';
import { useState } from 'react';
import { changeLogin, logout } from '../../../../store/actions/userActions';
import { toast } from 'react-toastify';
import { convertImage } from '../../../../service/app';

function HeaderRight ({
    className = '',
}) {
    // lấy ra token
    const [ isSettingActive, setIsSettingActive ]= useState(false);
    const [ isAvatarActive, setIsAvatarActive ]= useState(false);
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userReducer.user);
    const handleThemeClick = () => {
        dispatch(changeModal({
            isActive: true,
            Component: <ThemeModal/>
        }))
    }

    const handleAvatarClick = () => {
        if (userLogin._id) {
            setIsAvatarActive(true);
        }else {
            dispatch(changeModal({
                isActive: true,
                Component: <AuthForm/>
            }))
        }
    }

    const dataSettingMenu = [
        { title: "Danh sách chặn", icon: <i className='icon ic-20-Block'></i> },
        { 
            title: "Giao diện", 
            icon: <i className='icon ic-20-Play-Outline'></i>,
            events: {
                onClick: () => {
                    setIsSettingActive(false)
                    dispatch(changeModal({
                        isActive: true,
                        Component: <ThemeModal/>
                    }))
                }
            } 
        },
        { 
            title: "Ngôn ngữ", 
            icon: <i className='icon ic-global'></i>,
            iconHover: <i className='icon ic-go-right'></i>,
            children: [
                { title: "Tiếng Việt", icon: <i className='icon ic-20-Block'></i> },
                { title: "Tiếng Anh", icon: <i className='icon ic-20-Block'></i> },
            ]
        }
    ];

    const dataUser = [
        { title: "Mua code VIP", icon: <i className='icon ic-20-VIP'></i> },
        { title: "Nâng cấp VIP", icon: <i className='icon ic-20-VIP-2'></i> },
        { title: "Đăng xuất", icon: <i className='icon ic-log-out'></i>,events: {
            onClick: () => {
                localStorage.removeItem('idUser');
                localStorage.removeItem('token');
                dispatch(logout());
                setIsAvatarActive(false);
                toast.success('Đăng xuất tài khoản thành công');
            }
        } },
    ];


    return (  
        <div className={`headerRight ${className}`}>
            <Button title="Chủ đề" className="headerRight__button" onClick={handleThemeClick} buttonIcon>
                <img src={images.themeIcon} alt=""/>
            </Button>

            <Button title={'Nâng cấp vip'} className='headerRight__button' buttonIcon>
                <i className='icon ic-20-VIP-2'></i>
            </Button>

            <Button title="Upload" className='headerRight__button' buttonIcon>
                <i className='icon ic-upload'></i>
            </Button>

            {/* setting  */}
            <Tippy 
                visible={isSettingActive}
                interactive
                onClickOutside={() => setIsSettingActive(false)}
                render={() => (
                    <div>
                        <Section sectionModal className='header__setting-menu barNone' data={dataSettingMenu}/>
                    </div>
                )}
            >
                <div>
                    <Button onClick={() => setIsSettingActive(!isSettingActive)} title="Cài Đặt" className='headerRight__button' buttonIcon>
                        <i className='icon ic-settings'></i>
                    </Button>
                </div>
            </Tippy>
            
            {/* User  */}
            <Tippy
                visible={isAvatarActive}
                interactive
                onClickOutside={() => setIsAvatarActive(false)}
                render={() => (
                    <div>
                        <Section sectionModal className='header__setting-menu barNone' data={dataUser}/>
                    </div>
                )}
            >
                <div>
                    <Button title={userLogin.userName} onClick={handleAvatarClick} className='headerRight__button avatar' buttonIcon>
                        <img src={userLogin._id ? convertImage(userLogin.image) : images.defaultAvt} alt=""/>
                    </Button>
                </div>
            </Tippy>
        </div>
    );
}

HeaderRight.propTypes = {
    className: PropTypes.string,
}

export default HeaderRight;
