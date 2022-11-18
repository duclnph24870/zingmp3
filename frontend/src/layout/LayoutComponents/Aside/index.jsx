import PropTypes from 'prop-types';
import './Aside.scss';
import images from '../../../assets/images';
import path from '../../../config/path';
import { Button,MenuWrapper,Section } from '../../../components';
import { useSelector } from 'react-redux';

function Aside ({
    className = ''
}) {
    const theme = useSelector(state => state.appReducer.theme);
    const dataMenu = [
        { path: path.myMusic,title: "Cá Nhân", icon: <i className="icon ic-24-LibraryTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.home,title: "Khám Phá", icon: <i className="icon  ic-24-HomeTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.test,title: "#zingchart", icon: <i className="icon  ic-24-ChartTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.radio,title: "Radio", icon: <i className="icon  ic-24-RadioTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.follow,title: "Theo Dõi", icon: <i className="icon  ic-24-FeedTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
    ];

    const dataMenu2 = [
        { path: path.newMusic,title: "Nhạc Mới", icon: <i className="icon  ic-24-NewReleaseTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.category,title: "Thể Loại", icon: <i className="icon  ic-24-GenreTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.top100,title: "Top 100", icon: <i className="icon  ic-24-Top100Tab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.mv,title: "MV", icon: <i className="icon  ic-24-MVTab"></i>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
    ];

    const dataMenu3 = [
        { path: path.newMusic,title: "Bài Hát", icon: <img src={images.songIcon} alt=''/>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.newMusic,title: "Playlist", icon: <img src={images.playListIcon} alt=''/>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
        { path: path.newMusic,title: "Gần Đây", icon: <img src={images.historyIcon} alt=''/>, iconHover: <i className="icon ic-20-Play-Outline"></i>},
    ]

    return (  
        <div className={`aside ${className}`}>
            <div className='aside__logo'>
                <img src={theme.logo} alt=''/>
            </div>
            
            <Section className='aside__menu' data={dataMenu}/>

            <div className='seperateBar'></div>

            <MenuWrapper height='200px'>
                <Section className='aside__menu' data={dataMenu2}/>
                <h1 className='aside__section2-title'>
                    <span>THƯ VIỆN</span>
                    <i className='icon ic-edit'></i>
                </h1>
                <Section className='aside__menu' data={dataMenu3}/>
            </MenuWrapper>

            <Button className='addNewPlaylistBtn' iconLeft={<i className="icon ic-add"></i>}>Tạo Playlist Mới</Button>
        </div>
    );
}

Aside.propTypes = {
    className: PropTypes.string,
}

export default Aside;