import React from 'react';
import dynamic from 'next/dynamic';
import { useChartData } from './useChartData';
import { ApexOptions } from 'apexcharts';

// 动态导入 Chart 组件，并禁用服务器端渲染
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// 定义一个函数来生成 series 数据
const generateSeries = (data: { login_time: string; count: number }[]) => {
    return [
        {
            name: 'players',
            data: data.map(item => item.count),
        },
    ];
};

// 定义一个函数来生成 options 配置
const generateOptions = (data: { login_time: string; count: number }[]): ApexOptions => {
    return {
        chart: {
            type: 'area',
            animations: {
                easing: 'linear', // 确保这里是合法的值
                speed: 300,
            },
            sparkline: {
                enabled: false,
            },
            brush: {
                enabled: false,
            },
            id: 'basic-bar',
            foreColor: 'hsl(var(--nextui-default-800))',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: data.map(item => item.login_time),
            labels: {
                style: {
                    colors: 'hsl(var(--nextui-default-800))',
                },
            },
            axisBorder: {
                color: 'hsl(var(--nextui-nextui-default-200))',
            },
            axisTicks: {
                color: 'hsl(var(--nextui-nextui-default-200))',
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'hsl(var(--nextui-default-800))',
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        grid: {
            show: true,
            borderColor: 'hsl(var(--nextui-default-200))',
            strokeDashArray: 0,
            position: 'back',
        },
        stroke: {
            curve: 'smooth',
            fill: {
                colors: ['red'],
            },
        },
    };
};

export const MyChart = () => {
    const { data } = useChartData();

    const series = generateSeries(data);
    const options = generateOptions(data);
    // console.log('Data:', data);

    return (
        <div className="w-full z-20">
            <div id="chart">
                <Chart options={options} series={series} type="area" height={425} />
            </div>
        </div>
    );
};
