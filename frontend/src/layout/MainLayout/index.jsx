import PropTypes from 'prop-types';
import './MainLayout.scss';

import { Aside,Header,PlayController } from '../LayoutComponents';
import { useState } from 'react';

function MainLayout ( { children } ) {
    const [scroll,setScroll] = useState(false);

    const handleContentScroll = e => {
        const scrollTop = e.target.scrollTop;
        scrollTop === 0 ? setScroll(false) : setScroll(true); 
    }

    return (  
        <div className={'mainLayout wrapper'}>
            <Aside className={'mainLayout__aside'} />
            <div className={'mainLayout__content'} onScroll={handleContentScroll}>
                <Header scroll={scroll} className='mainLayout__header'/>
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