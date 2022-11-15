import PropTypes from 'prop-types';
import './Button.scss';
import { Link } from 'react-router-dom';

function Button ({
    children,
    className = '',
    pill = false,
    disabled = false,
    to,
    href,
    iconLeft,
    ... props
}) {
    let Component = 'button';
    let propsConfig = {
        ... props
    }

    if (disabled) {
        let keys = Object.keys(propsConfig);

        keys.map(item => {
            if (item.startsWith('on') && typeof propsConfig[item] === 'function') {
                delete propsConfig[item];
            }
        })
    }

    if (to && to.length > 0) {
        Component = Link;
        propsConfig.to = to;
    }else if (href && href.length > 0) {
        Component = 'a';
        propsConfig.href = href;
    }

    return (  
        <Component 
            className={
                `button ${pill ? 'pill' : ''} ${className} ${disabled ? 'disabled' : ''}`
            }
            {... propsConfig} 
        >
            { iconLeft && <span className="button__iconLeft">{iconLeft}</span> }
            {children}
        </Component>    
    );
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    pill: PropTypes.bool,
    disabled: PropTypes.bool,
    to: PropTypes.string,
    href: PropTypes.string,
    iconLeft: PropTypes.element,
}

export default Button;