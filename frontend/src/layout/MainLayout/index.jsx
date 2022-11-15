import PropTypes from 'prop-types';

function MainLayout ( { children } ) {
    return (  
        <>
            <h1>MainLayout</h1>
            { children }
        </>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element
} 

export default MainLayout;