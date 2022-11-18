import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../store/actions/appActions';
import { toast } from 'react-toastify';

function ThemeModalSection ({
    className = '',
    title,
    data,
}) {
    // item { title,background:  }
    const themeCurrName = useSelector(state => state.appReducer.theme.name);
    const dispatch = useDispatch();
    const handleChangeTheme = theme => {
        if (!theme) {
            toast.warn('Giao diện chưa được hỗ trợ');
        }else {
            dispatch(changeTheme(theme));
        }
    }
    return (  
        <div className={`themeModalSection ${className}`}>
            <h1 className="themeModalSection__title">{title}</h1>
            <div className="themeModalSection__content">
                { 
                    data 
                        && 
                    data.map((item,index) => {
                        return (
                            <div key={index} className={`themeModalSection__item ${(item.theme && item.theme.name === themeCurrName) ? 'active' : ''}`}>
                                <div style={{
                                    backgroundImage: item.background
                                }} className='themeModalSection__show'>
                                    <button className='useThemeBtn' onClick={() => handleChangeTheme(item.theme)}>Áp Dụng</button>
                                    <button className='activeIcon'>
                                        <i className='icon ic-check'></i>
                                    </button>
                                </div>
                                <span className='themeModalSection__label'>{item.title}</span>
                            </div>
                        );
                    })
                }       
            </div>
        </div>
    );
}

ThemeModalSection.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array,
}

export default ThemeModalSection;