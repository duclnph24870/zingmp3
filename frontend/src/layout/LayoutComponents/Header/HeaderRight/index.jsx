import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import images from '../../../../assets/images';
import { changeModal } from '../../../../store/actions/appActions'
import { Button } from '../../../../components';
import '../Header.scss';
import { ThemeModal } from '../../../../components';

function HeaderRight ({
    className = '',
}) {
    const dispatch = useDispatch();
    const handleThemeClick = () => {
        dispatch(changeModal({
            isActive: true,
            Component: <ThemeModal/>
        }))
    }


    return (  
        <div className={`headerRight ${className}`}>
            <Button className="headerRight__button" onClick={handleThemeClick} buttonIcon>
                <img src={images.themeIcon} alt=""/>
            </Button>

            <Button className='headerRight__button' buttonIcon>
                <i className='icon ic-20-VIP-2'></i>
            </Button>

            <Button className='headerRight__button' buttonIcon>
                <i className='icon ic-upload'></i>
            </Button>

            <Button className='headerRight__button' buttonIcon>
                <i className='icon ic-settings'></i>
            </Button>
            
            <Button className='headerRight__button avatar' buttonIcon>
                <img src='https://s120-ava-talk-zmp3.zmdcdn.me/a/a/9/6/7/120/7b99d0c26a89db3ba884b4e427962a17.jpg' alt=""/>
            </Button>
        </div>
    );
}

HeaderRight.propTypes = {
    className: PropTypes.string,
}

export default HeaderRight;
