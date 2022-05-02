import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// @mui
import {Box, List, Button, Rating, Avatar, ListItem, Pagination, Typography, Skeleton} from '@mui/material';
// utils
import {useDispatch} from "react-redux";
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

ProductDetailsReviewList.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetailsReviewList({ product }) {
  const {summary} = product;

  const [pageNum,setPageNum] = useState(0);
  const [pages,setPages] = useState(0);
  const [records,setRecords] = useState([]);


  const productId = product.id;

  useEffect(async () => {
      const response = await axios.get(`/api/check/review/page`, {
          params: {productId, pageNum, pageSize:20}
      });
      const {rating} = response.data;
      setRecords(rating.records);
      setPages(rating.pages);
  },[pageNum, productId]);

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
        <List disablePadding>
            {records.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={pages} color="primary" onChange={(event,index)=>setPageNum(index)}/>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object,
};

function ReviewItem({ review }) {
  const [isHelpful, setHelpfuls] = useState(false);

  const { name, rating, comment, helpful, createTime, avatarUrl, isPurchased } = review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 5,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(createTime)}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={rating} readOnly />

          {isPurchased && (
            <Typography
              variant="caption"
              sx={{
                my: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
              }}
            >
              <Iconify icon={'ic:round-verified'} width={16} height={16} />
              &nbsp;Verified purchase
            </Typography>
          )}

          <Typography variant="body2">{comment}</Typography>

          <Box
            sx={{
              mt: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {!isHelpful && (
              <Typography variant="body2" sx={{ mr: 1 }}>
                Was this review helpful to you?
              </Typography>
            )}

            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon={!isHelpful ? 'ic:round-thumb-up' : 'eva:checkmark-fill'} />}
              onClick={handleClickHelpful}
            >
              {isHelpful ? 'Helpful' : 'Thank'}({fShortenNumber(!isHelpful ? helpful : helpful + 1)})
            </Button>
          </Box>
        </div>
      </ListItem>
    </>
  );
}
