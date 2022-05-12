import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _invoices } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

const invoices = [
    {
        "id": "29fd471a07b2404b9a256a05fca69366",
        "name": "芜湖",
        "description": "<html> \n <head></head> \n <body> \n  <h1 class=\"ql-align-center\">学习资料</h1> \n  <h3>软件开发</h3> \n  <blockquote>\n    常用技术栈环境 \n  </blockquote> \n  <blockquote>\n    minio \n  </blockquote> \n  <pre class=\"ql-syntax\" spellcheck=\"false\">docker run -p 19000:19000 --name minio \\\n -itd -p 28080:28080 \\\n -e <span class=\"hljs-string\">\"MINIO_ROOT_USER=root\"</span> \\\n -e <span class=\"hljs-string\">\"MINIO_ROOT_PASSWORD=Passw0rd\"</span> \\\n -v /home/hydraone/service/minio/data:/data \\\n -v /home/hydraone/service/minio/config:/root/.minio \\\n minio/minio server /data --console-address <span class=\"hljs-string\">\":28080\"</span> --address <span class=\"hljs-string\">\":19000\"</span>\n</pre> \n  <p><img src=\"http://192.168.117.130:19000/demo/6b9af101b4362161b0e876684cb579f2\"></p> \n  <p>大撒大撒击破静安寺打破</p>  \n </body>\n</html>",
        "type": "Item",
        "createBy": "0082596802a681008d44bb4234028f61",
        "createTime": "2022-04-16T12:10:53.000+00:00",
        "updateBy": "0082596802a681008d44bb4234028f61",
        "updateTime": "2022-04-16T12:10:53.000+00:00",
        "available": 52,
        "delFlag": null,
        "price": null,
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/14da9ece3833d64cb32088f3d803721f",
            "http://192.168.117.130:19000/demo/454387f1881bbf3bcba95648d56d2e3e",
            "http://192.168.117.130:19000/demo/d8b83f6c85ab4f3fbd9dc759b0307169",
            "http://192.168.117.130:19000/demo/fb8cf94c54a6b2a796ba4f3088ffd460",
            "http://192.168.117.130:19000/demo/7cda93828d896c7c3bcbbc5a5298b146"
        ]
    },
    {
        "id": "79fe1c9262af4d4e954700e5a7b5033e",
        "name": "的撒大",
        "description": "<html>\n <head></head>\n <body>\n  <p>打撒大厦是会计</p>\n  <blockquote>\n   撒大苏打a\n  </blockquote>\n  <pre class=\"ql-syntax\" spellcheck=\"false\">的撒大苏打\nd的撒多少ijoi\n</pre>\n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-16T11:26:25.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-04-16T11:26:25.000+00:00",
        "available": 25,
        "delFlag": null,
        "price": null,
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/f255560bcfac25c764e809146301fdae",
            "http://192.168.117.130:19000/demo/51685f3285cf25f078b6556bf5a52e1c"
        ]
    },
    {
        "id": "3c64a73db4e54539bcf476934ea08b36",
        "name": "体检套餐",
        "description": "<html>\n <head></head>\n <body>\n  <p><img src=\"http://192.168.117.130:19000/demo/15899c3fc0e3fd27979e4d2380b33c07\"></p>\n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-16T12:19:39.000+00:00",
        "updateBy": null,
        "updateTime": "2022-05-01T17:56:30.000+00:00",
        "available": 25,
        "delFlag": null,
        "price": "54",
        "priceSale": "21",
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/8aef9a6946f8b9957cb2668a5368a535",
            "http://192.168.117.130:19000/demo/bf2dea61c5527a96173cfa4a50ba7207",
            "http://192.168.117.130:19000/demo/d110a46c9bd7c0f2fea93bd23a7b3fa5"
        ]
    },
    {
        "id": "7ce86f5905f841d79a7ee2bc407e458c",
        "name": "大苏打",
        "description": "<html>\n <head></head>\n <body>\n  <p><img src=\"http://192.168.117.130:19000/demo/cc02d6256c46506d7e1000c2c47127e7\"></p>\n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-16T11:24:58.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-04-16T11:24:58.000+00:00",
        "available": 58,
        "delFlag": null,
        "price": null,
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/f4bd9e27890c9ae507ffd4a9da9604f4"
        ]
    },
    {
        "id": "643f8bfd3f30496c954dc64a18821d1f",
        "name": "456465",
        "description": "<html>\n <head></head>\n <body>\n  <p>dsadasda</p>\n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-30T08:33:05.000+00:00",
        "updateBy": null,
        "updateTime": "2022-05-01T16:17:15.000+00:00",
        "available": 52,
        "delFlag": null,
        "price": null,
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/2e40303fe34d2f6415330bc2edd61971",
            "http://192.168.117.130:19000/demo/4232f38c34393a69ee67003765c16781",
            "http://192.168.117.130:19000/demo/ce265acd3b48e32878bdbb2cc011d2d2"
        ]
    },
    {
        "id": "f67cc964a5684cdda108d9cce5ec4078",
        "name": "dsaa ",
        "description": "<html> \n <head></head> \n <body> \n  <p><img src=\"http://192.168.117.130:19000/demo/7230d3c48ce9af38fa635de3c651d483\"></p>  \n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-16T12:14:50.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-04-16T12:14:50.000+00:00",
        "available": 68,
        "delFlag": null,
        "price": null,
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/41393eb5457495dc10531c7e6dc7d3ea",
            "http://192.168.117.130:19000/demo/9b9cb91662674637281528255dc2d20a",
            "http://192.168.117.130:19000/demo/ee93d9391a588255096306b82b9fffac"
        ]
    },
    {
        "id": "bf884513b3574407a2d69c81638de983",
        "name": "asdasd",
        "description": "<html>\n <head></head>\n <body>\n  <p>dasdsa </p>\n  <p><img src=\"http://192.168.117.130:19000/demo/d43791593281d54d0b64f6a888313bcf\"></p>\n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-16T12:23:02.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-04-16T12:23:02.000+00:00",
        "available": 58,
        "delFlag": null,
        "price": null,
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/b0e7986f69f62ce74cd9b1344f9ca469",
            "http://192.168.117.130:19000/demo/1842197fd838299329f017b28c85d3c2",
            "http://192.168.117.130:19000/demo/87a2e65ad748311b104413df1b2660bf",
            "http://192.168.117.130:19000/demo/99afaa7f44cc15c9dfd1eb5c60f159e7"
        ]
    },
    {
        "id": "84935c6d813043fdb87085850948cf8c",
        "name": "大大",
        "description": "<html>\n <head></head>\n <body>\n  <p>465456</p>\n </body>\n</html>",
        "type": "Item",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "createTime": "2022-04-16T08:38:58.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-04-16T08:38:58.000+00:00",
        "available": 58,
        "delFlag": null,
        "price": "",
        "priceSale": null,
        "param4": null,
        "summary": null,
        "tags": null,
        "children": [],
        "images": [
            "http://192.168.117.130:19000/demo/df697791162b727df458fd92403c2eba"
        ]
    }
];

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  const realInvoice = invoices.map(item=>({id:item.id,name:item.name}))

  currentInvoice.items = realInvoice;

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: currentInvoice?.invoiceNumber || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </Page>
  );
}
