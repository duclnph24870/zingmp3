import PropTypes from 'prop-types';
import Menu from '../MenuWrapper';
import { NavLink } from 'react-router-dom';
import { Button } from '..';
import './Section.scss';
import { useState } from 'react';

function Section ({ 
    className = '',
    data,
    sectionModal = false,
    ComponentItem,
    ...props
 }) {
    const [ dataRender,setDataRender ] = useState(data);
    const [ isChildren, setIsChildren ] = useState(false);

    return (  
            <Menu className={`section ${sectionModal ? 'sectionMenu' : ''} ${className}`} {... props}>
                {
                    isChildren 
                        &&
                    <div className='section-item section-backBtn'>
                        <Button 
                            className='section-button' 
                            iconLeft={<i className="icon ic-go-left"></i>}
                            onClick={() => {
                                setDataRender(data)
                                setIsChildren(false)
                            }}
                        >
                            Quay Lại
                        </Button>
                    </div>
                }
                { 
                    dataRender && 
                    dataRender.map((item,index) => {
                        let Component =  'div';
                        let option = null;
                        let childrenEvents = null;

                        if (item.path) {
                            Component = NavLink
                            option = {
                                to: item.path,
                            }
                        }

                        if (item.children) {
                            childrenEvents = {
                                onClick: () => {
                                    setDataRender(item.children)
                                    setIsChildren(true)
                                }
                            }
                        }
                        return (
                            <Component title={item.title} { ... item.events } { ... option } { ... childrenEvents } exact="true" className='section-item' key={index}>
                                { 
                                    ComponentItem 
                                        ?
                                    <ComponentItem data={item}/>
                                        : 
                                    <Button 
                                        className='section-button' 
                                        children={item.title} 
                                        iconLeft={item.icon}
                                    />
                                }
                                {item.iconHover && <span className='iconHover'>{item.iconHover}</span>}
                            </Component>
                        );
                    })
                }
            </Menu>
    );
}

Section.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    sectionModal: PropTypes.bool
}

export default Section;