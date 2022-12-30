import '../ZingChart.scss';
import PropTypes from 'prop-types';

function ZingChartSong({
    className = '',
    color,
    rank,
    style,
    persent,
    name,
    author,
    image,
    itemChart = false
}) {
    return (  
        <div className={`zingChartSong ${className} ${itemChart ? 'itemChart' : ''}`} style={{
            backgroundColor: itemChart ? color : 'hsla(0,0%,100%,.07)'
        }}>
            {
                !itemChart
                &&
                <div className={'zingChartSong-rank'} data-rank={rank - 1} style={{...style,'--color':color}}>{rank}</div>
            }
            <div className={'zingChartSong-image'}>
                <img src={image} alt="" />
                <div className={'zingChartSong-overlay'}></div>
            </div>
            <div className={'zingChartSong-song'}>
                <h1 className={'zingChartSong-songName'}>{name}</h1>
                <span className={'zingChartSong-author'}>{author}</span>
            </div>

            <div className="zingChartSong-percent" title='view hàng tháng'>
                {persent} %
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