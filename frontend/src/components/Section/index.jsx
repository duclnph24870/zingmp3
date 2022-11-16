import PropTypes from 'prop-types';
import Menu from '../MenuWrapper';
import { NavLink } from 'react-router-dom';
import { Button } from '..';
import './Section.scss';

function Section ({ 
    className = '',
    data,
    ...props
 }) {
    return (  
            <Menu className={`section ${className}`} {... props}>
                { 
                    data && 
                    data.map((item,index) => {
                        return (
                            <NavLink title={item.title} to={item.path} exact="true" className='section-item' key={index}>
                                <Button 
                                    className='section-button' 
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