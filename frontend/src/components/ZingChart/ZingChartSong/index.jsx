import '../ZingChart.scss';
import PropTypes from 'prop-types';

function ZingChartSong({
    className = '',
    color,
    rank,
    style,
    itemChart = false
}) {
    return (  
        <div className={`zingChartSong ${className} ${itemChart ? 'itemChart' : ''}`} style={{
            backgroundColor: itemChart ? color : 'hsla(0,0%,100%,.07)'
        }}>
            {
                !itemChart
                &&
                <div className={'zingChartSong-rank'} data-rank={rank} style={{...style,'--color':color}}>{rank}</div>
            }
            <div className={'zingChartSong-image'}>
                <img src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/2/0/3/f/203f50940ab726d125ea73d5c1baac94.jpg" alt="" />
                <div className={'zingChartSong-overlay'}></div>
            </div>
            <div className={'zingChartSong-song'}>
                <h1 className={'zingChartSong-songName'}>Có anh ở đây rồi</h1>
                <span className={'zingChartSong-author'}>Anh Tú</span>
            </div>

            <div className="zingChartSong-percent">
                15%
            </div>
        </div>
    );
}

ZingChartSong.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    rank: PropTypes.number,
    style: PropTypes.object,
}

export default ZingChartSong;