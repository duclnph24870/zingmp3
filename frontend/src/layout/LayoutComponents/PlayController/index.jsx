import PropTypes from 'prop-types';
import './PlayController.scss';

function PlayController({
    className = '',
}) {
    return ( 
        <div className={`playController ${className}`}>
            PlayController
        </div>
    );
}

PlayController.propTypes = {
    className: PropTypes.string,
}

export default PlayController;