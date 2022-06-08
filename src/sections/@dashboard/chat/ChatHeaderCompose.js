import PropTypes from 'prop-types';
import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {Box, Avatar, TextField, Typography, Autocomplete, Chip, Button} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
}));

const AutocompleteStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    minWidth: 280,
    marginLeft: theme.spacing(2),
    '&.Mui-focused .MuiAutocomplete-inputRoot': {
      boxShadow: theme.customShadows.z8,
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  },
}));

// ----------------------------------------------------------------------

ChatHeaderCompose.propTypes = {
  contacts: PropTypes.array,
  recipients: PropTypes.array,
  onAddRecipients: PropTypes.func,
  handleNewSession : PropTypes.func
};

export default function ChatHeaderCompose({ contacts, recipients, onAddRecipients,handleNewSession }) {
  const [query, setQuery] = useState('');

  const handleAddRecipients = (recipients) => {
    setQuery('');
    onAddRecipients(recipients);
  };

  return (
    <RootStyle>
      <Button onClick={()=>handleNewSession()}>
          新建健康咨询
      </Button>
    </RootStyle>
  );
}
