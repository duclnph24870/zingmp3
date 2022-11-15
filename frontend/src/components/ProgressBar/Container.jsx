import PropTypes from 'prop-types';

function Container ({ animationDuration, children, isFinished }) {
    return (  
        <div
            style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: 'none',
            transition: `opacity ${animationDuration}ms linear`,
            }}
        >
            {children}
        </div>
    );
}

Container.propTypes = {
    animationDuration: PropTypes.number,
    isFinished: PropTypes.bool,
    children: PropTypes.node
}

export default Container ;