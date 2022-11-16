import PropTypes from 'prop-types';
import './Menu.scss';

function Menu ({
    children,
    className = '',
    height = 'auto'
}) {
    const styles = {
        height,
        overflowY: 'scroll',
    }
    return (  
        <div style={styles} className={`menuWrapper ${className}`}>
            {children}
        </div>
    );
}

Menu.propTypes = {
    height: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}

export default Menu ;