import PropTypes from 'prop-types';
import { memo } from 'react';
import './SectionContent.scss';

function SectionContent ({
    className = '',
    title,
    all = false,
    children,

}) {
    return (  
        <div className={`sectionContent ${className}`}>
            <div className="sectionContent-header">
                <div className="sectionContent-title">
                    {title}
                </div>
                {
                    all
                        &&
                    <div className="sectionContent-showAll">
                        <span>Tất cả</span>
                        <i className="icon ic-go-right"></i>
                    </div>
                }
            </div>
            <div className="sectionContent-main">
                {children}
            </div>
        </div>
    );
}

SectionContent.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    all: PropTypes.bool,
    children: PropTypes.node,
}

export default memo(SectionContent);