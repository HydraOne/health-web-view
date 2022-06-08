import {useEffect, useRef, useState} from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer, Pagination, CardContent,
} from '@mui/material';
// _mock_
import { _bookings } from '../../../../_mock';
//
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import {BlogPostCommentForm, BlogPostCommentList, BlogPostHero, BlogPostTags} from "../../blog";
import Markdown from "../../../../components/Markdown";
import {CarouselArrows} from "../../../../components/carousel";
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------
const postData={"post":{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1","cover":"https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg","title":"Apply These 7 Secret Techniques To Improve Event","description":"Assumenda nam repudiandae rerum fugiat vel maxime.","createdAt":"2022-05-17T06:56:35.873Z","view":8849,"comment":3891,"share":6724,"favorite":6278,"author":{"name":"Jayvion Simon","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg"},"tags":["Lamp","A man","Human","Lantern","Festival"],"body":"\n\n<h1>Heading H1</h1><br/>\n<h2>Heading H2</h2><br/>\n<h3>Heading H3</h3><br/>\n<h4>Heading H4</h4><br/>\n<h5>Heading H5</h5><br/>\n<h6>Heading H6</h6><br/>\n\n<hr>\n<h3>Paragraph</h3><br/>\n<p>What is MTAweb Directory?</p><p><br></p><p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><p><br></p><p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p>\n<br/>\n<p><strong>This is strong text.</strong></p>\n<p><em>This is italic text</em></p>\n<p><u>This is underline text</u><span class=\"ql-cursor\"></span></p>\n\n<hr>\n<h3>Unordered list</h3><br/>\n<ul>\n  <li>Implements\n    <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n  </li>\n  <li>Implements\n  <a href=\"/dashboard/blog\">This is an inside link</a>\n  </li>\n  <li>Renders actual, \"native\" React DOM elements</li>\n  <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n  <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n\n<hr>\n<h3>Ordered list</h3><br/>\n<ol>\n  <li>Analysis</li>\n  <li>Design</li>\n  <li>Implementation</li>\n</ol>\n\n<hr>\n<h3>Blockquote</h3><br/>\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<hr>\n<h3>Block Code</h3><br/>\n<pre class=\"ql-syntax\" spellcheck=\"false\">cd project-folder\nnpm install\n</pre>\n\n<br/>\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">var</span> React = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'react'</span>);\n<span class=\"hljs-keyword\">var</span> Markdown = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'react-markdown'</span>);\n\nReact.render(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Markdown1</span> <span class=\"hljs-attr\">source</span>=<span class=\"hljs-string\">\"# Your markdown here\"</span> /&gt;</span>,\n  <span class=\"hljs-built_in\">document</span>.getElementById(<span class=\"hljs-string\">'content'</span>)\n);\n</pre>\n\n<br/>\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">createStyleObject</span>(<span class=\"hljs-params\">classNames, style</span>) </span>{\n  <span class=\"hljs-keyword\">return</span> classNames.reduce(<span class=\"hljs-function\">(<span class=\"hljs-params\">styleObject, className</span>) =&gt;</span> {\n   <span class=\"hljs-keyword\">return</span> {...styleObject, ...style[className]};\n  }, {});\n }\n</pre>\n\n<br/>\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p><br></p><p>Why do we use it?</p><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n\n<p>\n<img src='https://res.cloudinary.com/trinhmai/image/upload/c_scale,w_1440/v1611411340/upload_minimal/covers/cover_6.jpg'/>\n</p>\n\n\n<br/>\n<br/>\n\n<p>\nIt is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n\n<p>\n<img src='https://res.cloudinary.com/trinhmai/image/upload/c_scale,w_1440/v1611411339/upload_minimal/covers/cover_4.jpg'/>\n</p>\n\n","favoritePerson":[{"name":"Jayvion Simon","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg"},{"name":"Lucian Obrien","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg"},{"name":"Deja Brady","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_3.jpg"},{"name":"Harrison Stein","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg"},{"name":"Reece Chung","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"},{"name":"Lainey Davidson","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_6.jpg"},{"name":"Cristopher Cardenas","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_7.jpg"},{"name":"Melanie Noble","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_8.jpg"},{"name":"Chase Day","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_9.jpg"},{"name":"Shawn Manning","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_10.jpg"},{"name":"Soren Durham","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_11.jpg"},{"name":"Cortez Herring","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_12.jpg"},{"name":"Brycen Jimenez","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_13.jpg"},{"name":"Giana Brandt","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_14.jpg"},{"name":"Aspen Schmitt","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_15.jpg"},{"name":"Colten Aguilar","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_16.jpg"},{"name":"Angelique Morse","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_17.jpg"},{"name":"Selina Boyer","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_18.jpg"},{"name":"Lawson Bass","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_19.jpg"},{"name":"Ariana Lang","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_20.jpg"},{"name":"Amiah Pruitt","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_21.jpg"},{"name":"Harold Mcgrath","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_22.jpg"},{"name":"Esperanza Mcintyre","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_23.jpg"},{"name":"Mireya Conner","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_24.jpg"},{"name":"Jamie Kline","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_25.jpg"},{"name":"Laney Vazquez","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_26.jpg"},{"name":"Tiffany May","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_27.jpg"},{"name":"Dexter Shepherd","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_28.jpg"},{"name":"Jaqueline Spencer","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_29.jpg"},{"name":"Londyn Jarvis","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_30.jpg"},{"name":"Yesenia Butler","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_31.jpg"},{"name":"Jayvon Hull","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_32.jpg"},{"name":"Izayah Pope","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_33.jpg"},{"name":"Ayana Hunter","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_34.jpg"},{"name":"Isabell Bender","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_35.jpg"},{"name":"Desiree Schmidt","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_36.jpg"},{"name":"Aidan Stout","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_37.jpg"},{"name":"Jace Bush","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_38.jpg"},{"name":"Janiya Williamson","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_39.jpg"},{"name":"Hudson Alvarez","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_40.jpg"}],"comments":[{"id":"3ea0d8ac-4661-4fff-ba2f-de350a36399c","name":"Jayvion Simon","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg","message":"Quis veniam aut saepe aliquid nulla.","postedAt":"2022-05-16T05:56:35.873Z","users":[{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1","name":"Jayvion Simon","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg"},{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2","name":"Lucian Obrien","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg"},{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3","name":"Deja Brady","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_3.jpg"}],"replyComment":[{"id":"c956541a-c730-4e00-a10d-be03f667dcc4","userId":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2","message":"Reprehenderit ut voluptas sapiente ratione nostrum est.","postedAt":"2022-05-15T04:56:35.873Z"},{"id":"a7c4cd08-8ff7-4a2d-a8c3-711b80dc02eb","userId":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1","message":"Error ut sit vel molestias velit.","tagUser":"Lucian Obrien","postedAt":"2022-05-14T03:56:35.873Z"},{"id":"61beda0f-95c8-40cb-92c6-4ea4b7af438a","userId":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3","message":"Quo quia sit nihil nemo doloremque et.","postedAt":"2022-05-13T02:56:35.873Z"}]},{"id":"63b8fc81-6ef6-45be-8cd6-b914d211f522","name":"Reece Chung","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg","message":"Autem doloribus harum vero laborum.","postedAt":"2022-05-12T01:56:35.873Z","users":[{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6","name":"Lainey Davidson","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_6.jpg"},{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7","name":"Cristopher Cardenas","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_7.jpg"},{"id":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8","name":"Melanie Noble","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_8.jpg"}],"replyComment":[{"id":"dc599698-0b47-4362-b3f3-00f9be1c7a31","userId":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6","message":"Tempora officiis consequuntur architecto nostrum autem nam adipisci.","postedAt":"2022-05-11T00:56:35.873Z"},{"id":"7e09eea4-57db-44ee-927b-34298ac9e0a5","userId":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7","message":"Voluptas sunt magni adipisci praesentium saepe.","postedAt":"2022-05-09T23:56:35.873Z"},{"id":"c52cad36-84bc-4222-b071-a04ca1157203","userId":"e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8","message":"Ea architecto quas voluptates voluptas earum illo est vel rem.","postedAt":"2022-05-08T22:56:35.873Z"}]},{"id":"80f0337d-165a-4095-98b7-acefe8d4cc91","name":"Chase Day","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_9.jpg","message":"Ipsum expedita reiciendis ut.","postedAt":"2022-05-07T21:56:35.873Z","users":[],"replyComment":[]},{"id":"278d80a2-40b5-4357-abed-2479a87c7445","name":"Shawn Manning","avatarUrl":"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_10.jpg","message":"Architecto vel voluptatibus alias a aut non maxime ipsa voluptates.","postedAt":"2022-05-06T20:56:35.873Z","users":[],"replyComment":[]}]}};

export default function HealthNewsDetails() {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const isLight = theme.palette.mode === 'light';

  const [news,setNews] = useState();

  useEffect(() =>{
    async function fetchData(){
      await axios.get('/api/healthNews/get/last').then(res=>{
        const {healthNews:{content}} = res.data;
        setNews(content);
      })
    }
    fetchData();
  },[localStorage.getItem("currentUserId")])

  const {post} = postData;

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <>
      <Box>
        <CardHeader
            title="健康新闻"
            subheader="12 Booking"
            action={
              <CarouselArrows
                  customIcon={'ic:round-keyboard-arrow-right'}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
              />
            }
            sx={{
              p: 0,
              mb: 3,
              '& .MuiCardHeader-action': { alignSelf: 'center' },
            }}
        />
        <CardContent>
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Markdown children={news} />
          </Box>
        </CardContent>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
