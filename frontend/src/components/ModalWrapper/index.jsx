import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './Modal.scss';
import { changeModal } from '../../store/actions/appActions';

function ModalWrapper ({
    children,
    className = '',
    isActive,
}) {
    const dispatch = useDispatch();
    return (  
        <div className={`modalWrapper ${isActive ? 'active' : ''} ${className}`}>
            <div className='modalOverlay' onClick={() => (
                dispatch(changeModal({
                    isActive: false,
                    Component: null
                }))
            )}></div>
            <div className='modalContent'>
                {children}
            </div>
        </div>
    );
}

ModalWrapper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default ModalWrapper;