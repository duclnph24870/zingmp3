import PropTypes from 'prop-types';
import './Header.scss';

function Header ({
    className = ''
}) {
    return (  
        <div className={`header ${className}`}>
            Header
        </div>
    );
}

Header.propTypes = {
    className: PropTypes.string,
}

export default Header;