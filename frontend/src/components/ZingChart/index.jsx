import PropTypes from 'prop-types';
import './ZingChart.scss';
import Button from '../Button';
import ZingChartSong from './ZingChartSong';
import ChartLine from '../ChartLine';
import { memo, useEffect, useState } from 'react';
import request from '../../utils/axios';
import { Skeleton, Space } from 'antd';

function ZingChart({
    classNames = '',

}) {
    const [rankActive,setRankActive] = useState(0);
    const [data,setData] = useState([]);

    useEffect(() => {
        (async () => {
            const dataChart = await request.post('/song/chart');

            setData(dataChart);
        })();
    },[]);

    const handleHover = e => {
        const songEl = e.target.closest('.zingChartSong');
        if (songEl && !songEl.matches('.active')) {
            const rank = songEl.querySelector('.zingChartSong-rank').dataset.rank;
            setRankActive(Number(rank));
        }
    }

    return (
        <>
            {
                data.length === 0
                ?
                    <Skeleton.Button className='skeletonChart' active={true} shape="square" block={true}/>
                :
                <div className="zingChart-bg">
                    <div className={'zingChart-wrapper'}>
                        <div className={'zingChart-left'}>
                            <div className={'zingChart-title'}>
                                <h1 className={'zingChart-titleText'}>#zingChart</h1>
                                <Button buttonIcon children={<i className='icon ic-play'></i>}/>
                            </div>

                            <div className={'zingChart-leftContent'} onMouseOver={handleHover}>
                                { 
                                    data.datasets
                                    &&
                                    data.datasets.map((item,index) => {
                                        let color = '';
                                        if (index === 0) {color = '#4a90e2'}
                                        if (index === 1) {color = '#50e3c2'}
                                        if (index === 2) {color = '#e35050'}
                                        return (<ZingChartSong persent={item.monthPersent} name={item.name} author={item.author} image={item.image} key={item._id} rank={index + 1} className={rankActive === index ? 'active': ''} color={color}/>);
                                    })
                                }
                            </div>
                        </div>
                        <div className={'zingChart-chart'}>
                            <ChartLine rankActive={rankActive} dataChart={data} setRankActive={setRankActive}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

ZingChart.propTypes = {
    classNames: PropTypes.string
}

export default memo(ZingChart);