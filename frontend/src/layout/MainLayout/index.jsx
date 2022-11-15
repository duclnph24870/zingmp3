import PropTypes from 'prop-types';
import './MainLayout.scss';

import { Aside,Header,PlayController } from '../LayoutComponents';

function MainLayout ( { children } ) {
    return (  
        <div className={'mainLayout wrapper'}>
            <Aside className={'mainLayout__aside'} />
            <div className={'mainLayout__content'}>
                <Header className='mainLayout__header'/>
                { children }
            </div>
            <PlayController />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element
} 

export default MainLayout;