import PropTypes from 'prop-types';
import './ZingChart.scss';
import Button from '../Button';
import ZingChartSong from './ZingChartSong';
import ChartLine from '../ChartLine';
import { useState } from 'react';

function ZingChart({
    classNames = '',

}) {
    const [rankActive,setRankActive] = useState(undefined);
    const handleHover = e => {
        const songEl = e.target.closest('.zingChartSong');
        if (songEl && !songEl.matches('.active')) {
            const rank = songEl.querySelector('.zingChartSong-rank').dataset.rank;
            setRankActive(Number(rank));
        }
    }

    return (
        <div className="zingChart-bg">
            <div className={'zingChart-wrapper'}>
                <div className={'zingChart-left'}>
                    <div className={'zingChart-title'}>
                        <h1 className={'zingChart-titleText'}>#zingChart</h1>
                        <Button buttonIcon children={<i className='icon ic-play'></i>}/>
                    </div>

                    <div className={'zingChart-leftContent'} onMouseOver={handleHover}>
                        <ZingChartSong rank={1} className={rankActive === 1 ? 'active': ''} color="#4a90e2"/>
                        <ZingChartSong rank={2} className={rankActive === 2 ? 'active': ''} color="#50e3c2"/>
                        <ZingChartSong rank={3} className={rankActive === 3 ? 'active': ''}  color={'#e35050'}/>
                    </div>
                </div>
                <div className={'zingChart-chart'}>
                    <ChartLine rankActive={rankActive} setRankActive={setRankActive}/>
                </div>
            </div>
        </div>
    );
}

ZingChart.propTypes = {
    classNames: PropTypes.string
}

export default ZingChart;