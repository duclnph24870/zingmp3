import PropTypes from 'prop-types';
import Menu from '../../Menu';
import { NavLink } from 'react-router-dom';
import { Button } from '../../../../components';

function Section ({ 
    className = '',
    data,
    ...props
 }) {
    return (  
            <Menu className={`aside__menu-section ${className}`} {... props}>
                { 
                    data && 
                    data.map((item,index) => {
                        return (
                            <NavLink title={item.title} to={item.path} exact="true" className='aside__menu-item' key={index}>
                                <Button 
                                    className='aside__menu-button' 
                                    children={item.title} 
                                    iconLeft={item.icon}
                                />
                                {item.iconHover && <span className='iconHover'>{item.iconHover}</span>}
                            </NavLink>
                        );
                    })
                }
            </Menu>
    );
}

Section.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
}

export default Section;