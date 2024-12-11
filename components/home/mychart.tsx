import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import { useChartData } from './useChartData';
import { useTheme } from 'next-themes';

// 格式化数据
const formatData = (data: { login_time: string; count: number }[]) =>
    data.map(({ login_time, count }) => ({ login_time, count }));

// 自定义 Tooltip 渲染
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#000',
                }}
            >
                <p>{`日期: ${payload[0].payload.login_time}`}</p>
                <p>{`日活跃人数: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export const MyChart = () => {
    const { data } = useChartData();
    const { theme } = useTheme();
    const formattedData = formatData(data);

    // 等待 theme 初始化完成
    if (!theme) {
        return null;
    }

    // 根据主题动态设置颜色
    const getColor = (lightColor: string, darkColor: string) =>
        theme === 'dark' ? darkColor : lightColor;

    return (
        <div className="chart-container" style={{ width: '100%', height: '480px' }}>
            <ResponsiveContainer>
                <AreaChart data={formattedData}>
                    {/* 网格 */}
                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke={getColor('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')}
                    />

                    {/* X 轴 */}
                    <XAxis
                        dataKey="login_time"
                        tick={{
                            fontSize: 15,
                            fill: getColor('#000', 'rgba(255, 255, 255, 0.8)'),
                        }}
                        axisLine={{
                            stroke: getColor('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)'),
                        }}
                        tickLine={{
                            stroke: getColor('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)'),
                        }}
                        padding={{ left: 10, right: 10 }}
                    />

                    {/* Y 轴 */}
                    <YAxis
                        tick={{
                            fill: getColor('#000', 'rgba(255, 255, 255, 0.8)'),
                        }}
                        axisLine={{
                            stroke: getColor('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)'),
                        }}
                        tickLine={{
                            stroke: getColor('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)'),
                        }}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax / 5) * 5]}
                    />

                    {/* 自定义 Tooltip */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* 区域图 */}
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        fill="rgba(59, 130, 246, 0.4)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
