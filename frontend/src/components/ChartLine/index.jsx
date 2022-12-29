import PropTypes from 'prop-types';
import './ChartLine.scss';

import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import Crosshair from "chartjs-plugin-crosshair";
import { isEqual } from 'lodash';
import Tippy from '@tippyjs/react/headless';
import ZingChartSong from '../ZingChart/ZingChartSong';

function ChartLine({
    className = '',
    rankActive = undefined,
    setRankActive,
}) {
    useEffect(() => {
        Chart.register(Crosshair);
        return () => {
            Chart.unregister(Crosshair);
        };
    }, []);
    const chartRef = useRef();
    const [tooltip,setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,
        color: 'transparent'
    });
    const data = {
        labels: ['01', '02', '03','04','05','06','07','08','09','10','11','12'],
        datasets: [
            {
                id: 1,
                label: 'February',
                data: [5, 6, 7,12,3,4,5,4,65,12,88,33],
                borderColor: 'rgb(74,144,226)',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointHoverRadius: 5,
                pointRadius: rankActive === 1 ? 5 : 0,
                pointHoverBorderWidth: 2,
            },
            {
                id: 2,
                label: 'January',
                data: [3, 2, 1,3,100,3,134,45,13,8,6,78],
                borderColor: 'rgb(227,80,80)',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointHoverRadius: 5,
                pointRadius: rankActive === 2 ? 5 : 0,
                pointHoverBorderWidth: 2,
            },
            {
                id: 3,
                label: 'March',
                data: [5, 6, 17,1,4,2,4,45,56,7,8,76],
                borderColor: 'rgb(39,189,156)',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointHoverRadius: 5,
                pointRadius: rankActive === 3 ? 5 : 0,
                pointHoverBorderWidth: 2,
            },
        ]
    };

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        animations: false,
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

export default ChartLine;