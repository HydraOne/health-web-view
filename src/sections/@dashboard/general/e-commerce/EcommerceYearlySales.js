import merge from 'lodash/merge';
import {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import PropTypes from "prop-types";
import { BaseOptionChart } from '../../../../components/chart';
import axios from "../../../../utils/axios";
import {fDate} from "../../../../utils/formatTime";
import ProductDetailsReviewList from "../../e-commerce/product-details/ProductDetailsReviewList";

const data = {
    "msg": "操作成功",
    "date": [
        "2022-05-10T16:00:00.000+00:00",
        "2022-05-11T16:00:00.000+00:00",
        "2022-05-12T16:00:00.000+00:00",
        "2022-05-13T16:00:00.000+00:00",
        "2022-05-14T16:00:00.000+00:00",
        "2022-05-15T16:00:00.000+00:00",
        "2022-05-16T16:00:00.000+00:00",
        "2022-05-17T16:00:00.000+00:00",
        "2022-05-18T16:00:00.000+00:00",
        "2022-05-19T16:00:00.000+00:00",
        "2022-05-20T16:00:00.000+00:00",
        "2022-05-21T16:00:00.000+00:00",
        "2022-05-22T16:00:00.000+00:00",
        "2022-05-23T16:00:00.000+00:00",
        "2022-05-24T16:00:00.000+00:00"
    ],
    "totalTrend": [
        {
            "name": "已完成",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "name": "已取消",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "name": "已预约",
            "data": [
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0
            ]
        }
    ],
    "code": 200
}
// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
      { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
    ],
  },
  {
    year: 2020,
    data: [
      { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
      { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
    ],
  },
];
EcommerceYearlySales.propTypes = {
    id: PropTypes.string,
};

export default function EcommerceYearlySales({id}) {
  const [seriesData, setSeriesData] = useState({});
  const [date, setDate] = useState([]);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  // const {totalTrend,date} = data;

  useEffect(()=>{
      async function fetchData(){
          await axios.get(`/api/order/getCheckEntityTotalStatus/${id}`).then(res=>{
              const {totalTrend,date} = res.data;
              setSeriesData(totalTrend);
              setDate(date);
          });
      }
      fetchData();
  },[id])

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: date.map(item=>fDate(item)),
    },
  });

  return (
    <Card>
      <CardHeader
        title="体检套餐近期售卖情况"
      />
        <Box  sx={{ mt: 3, mx: 3 }} dir="ltr">
            <ReactApexChart type="area" series={seriesData} options={chartOptions} height={364} />
        </Box>

    </Card>
  );
}
