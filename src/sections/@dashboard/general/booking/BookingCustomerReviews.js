import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {useEffect, useRef, useState} from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Chip, Stack, Avatar, Rating, Button, CardHeader, Typography } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// _mock_
import { _bookingReview } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
import { CarouselArrows } from '../../../../components/carousel';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

export default function BookingCustomerReviews() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const [dataList,setDataList] = useState([]);

  const [currentItemNum,setCurrentItem] = useState(0);

  const [pageNum,setPageNum] = useState(0);

  useEffect(() => {
      async function fetchData() {
          const response = await axios.post("/api/healthRecipes/page",{pageNum,pageSize:10});
          const {healthRecipes} = response.data;
          setDataList(healthRecipes)
      }
      fetchData();
  },[pageNum])

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    adaptiveHeight: true,
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <CardHeader
        title="膳食计划"
        subheader={`${_bookingReview.length} Reviews`}
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
          },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {dataList.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    rating: PropTypes.number,
    tags: PropTypes.array,
  }),
};

function ReviewItem({ item }) {
  const { userInfo, details, effectDesc } = item;

  return (
    <Stack spacing={2} sx={{ minHeight: 402, position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <div>
          <Typography variant="subtitle2">你好</Typography>
        </div>
      </Stack>

      <Typography variant="body2">{details}</Typography>

      <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
        <Button fullWidth variant="contained" endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}>
          Accept
        </Button>
        <Button fullWidth variant="contained" color="error" endIcon={<Iconify icon={'eva:close-circle-fill'} />}>
          Reject
        </Button>
      </Stack>
    </Stack>
  );
}
