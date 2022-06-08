import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Input, Divider, IconButton, InputAdornment } from '@mui/material';
// utils
import uuidv4 from '../../../utils/uuidv4';
// components
import Iconify from '../../../components/Iconify';
import EmojiPicker from '../../../components/EmojiPicker';
import axios from "../../../utils/axios";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  conversationId: PropTypes.string,
  onSend: PropTypes.func,
};

export default function ChatMessageInput({ disabled, conversationId, onSend }) {
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');

  const handleUploadFile = async (event) => {
    const file = event.target.files[0];// 选择单个文件
    const forms = new FormData();
    const configs = {
      headers: {'Content-Type': 'multipart/form-data'}
    };
    forms.append("files",file);
    forms.append('bucketName', 'demo');
    const list = [];
    await axios.post("/api/file/uploadPictures", forms, configs).then(res => {
      list.push(res.data.data[0]);
    });
    if (onSend && conversationId) {
      onSend({
        conversationId,
        messageId: uuidv4(),
        message: `http://192.168.117.130:19000/demo/${list.pop()}`,
        contentType: 'image',
        attachments: [],
        createdAt: new Date(),
        senderId: localStorage.getItem("currentUserId"),
      });
    }
    return setMessage('');
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend && conversationId) {
      onSend({
        conversationId,
        messageId: uuidv4(),
        message,
        contentType: 'text',
        attachments: [],
        createdAt: new Date(),
        senderId: localStorage.getItem("currentUserId"),
      });
    }
    return setMessage('');
  };

  return (
    <RootStyle>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="发送信息"
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker disabled={disabled} value={message} setValue={setMessage} />
          </InputAdornment>
        }
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Iconify icon="ic:round-add-photo-alternate" width={22} height={22} />
            </IconButton>
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }}>
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>

      <input type="file" ref={fileInputRef} onChange={handleUploadFile} style={{ display: 'none' }} />
    </RootStyle>
  );
}
