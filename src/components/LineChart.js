
import React from "react";
import "./style/summarycard.css";
import Chart from 'react-apexcharts'



const LineChart = ({weekly}) => {
    const temp = weekly.map((day)=> parseInt(day.main.temp))
    const humidity = weekly.map((day)=>day.main.humidity)
    const timeline = weekly.map((day)=>day.dt_txt)

    const series =[{
            name: 'Temputure(&deg;C)',
            data: temp
          }, {
            name: 'Humidity(%)',
            data: humidity
          }]
    const option = {
            chart: {
            height: 350,
            type: 'area',
        },
        colors: ['#feb062', '#3f3b3b'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: timeline
          },
          tooltip: {
            x: {
              format: 'MM/dd/yy'
            },
          },
    }


  return (
    <div style={{background:'rgba(247, 232, 232,0.5)',borderRadius:'1rem'}}>
        <Chart type="line" width={850} height={550} series={series} options={option} />
    </div>
  );
};

export default LineChart;
