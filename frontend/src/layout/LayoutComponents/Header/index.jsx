import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { searchKeywordRealtime } from '../../../service/search';
import Search from '../Search';
import './Header.scss';
import HeaderRight from './HeaderRight';

function Header ({
    className = '',
    scroll = false,
}) {
    const [searchResult,setSearchResult] = useState({});
    const [isLoadingSearch, setLoadingSearch] = useState(false);

    const handleClickNavigateButton = number => {
        history.go(number);
    }

    // handle logic search 
    const handleSearch = async value => {
        if (value.length === 0) {
            return;
        }
        try {
            setLoadingSearch(true);
            let { userResult,songResult } = await searchKeywordRealtime({
                q: value,
                amount: 5,
                type: 'all',
            });
            
            let userData = [];
            let songData = [];
            // xử lý dữ liệu trả về
            if (userResult.length > 0) {
                userData = userResult.map(item => {
                    return {
                        name: item.userName,
                        type: "Nghệ sĩ",
                        avatar: item.avatar
                    }
                })
            }else if (songResult.length > 0) {
                songData = songResult.map(item => {
                    return {
                        title: item.name,
                        icon: <i className="icon ic-search"></i>,
                    }
                })
            }
            setSearchResult({
                userData,
                songData
            });
            setLoadingSearch(false);
        } catch (error) {
            toast.error('Lỗi server!!!')
        }
    }

    return (  
        <div className={`header ${scroll ? 'scroll' : ''} ${className}`}>
            <div className={'header__buttonNavigate'}>
                <button className={`buttonIcon ${history.state ? 'disabled' : ''}`} onClick={() => handleClickNavigateButton(1)} style={{marginRight: '24px'}}>
                    <i className='icon ic-back'></i>
                </button>

                <button className={`buttonIcon ${!history.state ? 'disabled' : ''}`} onClick={() => handleClickNavigateButton(-1)}>
                    <i className='icon ic-forward'></i>
                </button>
            </div>

            <Search isLoading={isLoadingSearch} handleSearch={handleSearch} data={searchResult} className='header__search'/>
            <HeaderRight />
        </div>
    );
}

Header.propTypes = {
    className: PropTypes.string,
    scroll: PropTypes.bool,
}

export default Header;