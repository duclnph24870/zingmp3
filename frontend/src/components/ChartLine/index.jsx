import PropTypes from 'prop-types';
import './ChartLine.scss';

import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { memo, useEffect, useRef, useState } from 'react';
import Crosshair from "chartjs-plugin-crosshair";
import { isEqual } from 'lodash';
import Tippy from '@tippyjs/react/headless';
import ZingChartSong from '../ZingChart/ZingChartSong';

function ChartLine({
    className = '',
    rankActive = 0,
    setRankActive,
    dataChart,
}) {
    const chartRef = useRef();
    const [tooltip,setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,
        dateActive: 1,
        color: 'transparent'
    });
    let dataItems = dataChart.datasets; 
    let songactive = dataItems[rankActive];
    useEffect(() => {
        Chart.register(Crosshair);
        return () => {
            Chart.unregister(Crosshair);
        };
    }, []);
    const data = {
        labels: dataChart.labels,
        datasets: [
            {
                id: 0,
                label: 'February',
                data: dataItems[0].persentDay,
                borderColor: 'rgb(74,144,226)',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointHoverRadius: 5,
                pointRadius: rankActive === 0 ? 5 : 0,
                pointHoverBorderWidth: 2,
            },
            {
                id: 1,
                label: 'January',
                data: dataItems[1].persentDay,
                borderColor: 'rgb(39,189,156)',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointHoverRadius: 5,
                pointRadius: rankActive === 1 ? 5 : 0,
                pointHoverBorderWidth: 2,
            },
            {
                id: 2,
                label: 'March',
                data: dataItems[2].persentDay,
                borderColor: 'rgb(227,80,80)',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointHoverRadius: 5,
                pointRadius: rankActive === 2 ? 5 : 0,
                pointHoverBorderWidth: 2,
            },
        ]
    };

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        animation: {
            duration: 300,
        },
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.3)',drawTicks: false },
                border: { dash: [3,4]}
            },
            x: {
                ticks: { color: '#978e99' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: {display: false},
            tooltip: { 
                enabled: false,
                intersect: false,
                external: context => {
                    //context gồm chart và tooltip là 2 giá trị mà chartjs trả về khi hover vào
                    const tooltopModel = context.tooltip;
                    const id = tooltopModel.dataPoints[0].dataset.id;
                    //check xem chart có tồn tại hay không
                    if (!chartRef) {
                        return;
                    }

                    const newTooltipData = {
                        opacity: 1,
                        left: tooltopModel.caretX,
                        top: tooltopModel.caretY,
                        color: tooltopModel.labelColors[0].borderColor,
                        dateActive: +tooltopModel.title[0],
                    }

                    setRankActive(id);

                    tooltopModel.dataPoints[0].dataset.pointBackgroundColor = tooltopModel.labelColors[0].borderColor;

                    if (!isEqual(tooltip,newTooltipData)) {
                        return setTooltip(newTooltipData);
                    }
                }
            },
            crosshair: {
                line: {
                  color: tooltip.color,
                  width: 1,
                },
                sync: {
                    enabled: true,
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        },
    }

    return (
        <div style={{position: 'relative',width: '100%',height: '100%'}}>
            {data && <Line ref={chartRef} className='chartLine' data={data} plugins={[Crosshair]} options={options}/>}
            <Tippy
                visible={(tooltip.top !== 0 && tooltip.left !== 0)}
                interactive={true}
                arrow={true}
                popperOptions={{
                    modifiers: [{
                        name: 'computeStyles',
                        options: {
                            adaptive: false,
                        },
                    }]
                }}
                render={() => (
                    <div>
                        <ZingChartSong
                            color={tooltip.color}
                            itemChart={true}
                            style={{
                                backgroundColor: '#333',
                            }}
                            persent={songactive.persentDay[tooltip.dateActive - 1]} name={songactive.name} author={songactive.author} image={songactive.image}
                        />
                    </div>
                )}
            >
                <div className="tooltip" style={{
                    top: tooltip.top,
                    left: tooltip.left,
                    opacity: tooltip.opacity,
                    position: 'absolute',
                    pointerEvents: 'none',
                }}></div>
            </Tippy>
        </div>
    );
}

ChartLine.propTypes = {
    className: PropTypes.string,
    rankActive: PropTypes.number,
    setRankActive: PropTypes.func
}

export default memo(ChartLine);