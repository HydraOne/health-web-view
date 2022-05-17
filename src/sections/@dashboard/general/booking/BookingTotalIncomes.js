import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Typography, Stack} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// utils
import {useEffect, useState} from "react";
import { fCurrency, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import BaseOptionChart from '../../../../components/chart/BaseOptionChart';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  padding: theme.spacing(3),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

// ----------------------------------------------------------------------

const TOTAL = 18765;
const PERCENT = 2.6;
const CHART_DATA = [{ data: [111, 136, 76, 108, 74, 54, 57, 84] }];

export default function BookingTotalIncomes() {
  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 4 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fCurrency(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    fill: { gradient: { opacityFrom: 0, opacityTo: 0 } },
  });

  const [chartData,setChartData] = useState([]);



  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get('/api/healthTrend/getList');
      const {healthTrends} = response.data;
      const map = healthTrends.map((healthTrend)=>healthTrend.trendIndex);
      setChartData([{ data: map }]);
    }
    fetchData();
  },[])

  return (
    <RootStyle>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2' }}>健康指数</Typography>
          <HealthAndSafetyIcon/>
        </div>

        <div>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 0.6 }}>
            <Iconify width={20} height={20} icon={PERCENT >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
            <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
              {PERCENT > 0 && '+'}
              {fPercent(PERCENT)}
            </Typography>
          </Stack>
          <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
            &nbsp;过去一星期
          </Typography>
        </div>
      </Stack>

      <ReactApexChart type="area" series={chartData} options={chartOptions} height={132} />
    </RootStyle>
  );
}
