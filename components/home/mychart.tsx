import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart, { Props } from "react-apexcharts";
import {API_URL} from "@/config/apiconfig";

export const MyChart = () => {
    const [data, setData] = useState<{ login_time: string; count: number }[]>([]);

    useEffect(() => {
        axios.get(API_URL+'/login_count')
            .then(response => {
                if (response.data.code === 200) {
                    setData(response.data.data);
                } else {
                    console.error('API request failed');
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, []);

    const series: Props["series"] = [
        {
            name: "Series1",
            data: data.map(item => item.count),
        },
    ];

    const options: Props["options"] = {
        chart: {
            type: "area",
            animations: {
                easing: "linear",
                speed: 300,
            },
            sparkline: {
                enabled: false,
            },
            brush: {
                enabled: false,
            },
            id: "basic-bar",
            foreColor: "hsl(var(--nextui-default-800))",
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: data.map(item => new Date(item.login_time).toLocaleDateString()),
            labels: {
                style: {
                    colors: "hsl(var(--nextui-default-800))",
                },
            },
            axisBorder: {
                color: "hsl(var(--nextui-nextui-default-200))",
            },
            axisTicks: {
                color: "hsl(var(--nextui-nextui-default-200))",
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "hsl(var(--nextui-default-800))",
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        grid: {
            show: true,
            borderColor: "hsl(var(--nextui-default-200))",
            strokeDashArray: 0,
            position: "back",
        },
        stroke: {
            curve: "smooth",
            fill: {
                colors: ["red"],
            },
        },
    };

    return (
        <div className="w-full z-20">
            <div id="chart">
                <Chart options={options} series={series} type="area" height={425} />
            </div>
        </div>
    );
};