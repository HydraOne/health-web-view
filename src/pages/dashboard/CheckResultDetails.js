import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import {useEffect, useState} from "react";
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mock';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
// import Invoice from '../../sections/@dashboard/invoice/details';
import Invoice from '../../sections/@dashboard/invoice/details/CheckResultInvoiceDetails';
import axios from "../../utils/axios";
import InvoiceNewEditForm from "../../sections/@dashboard/invoice/new-edit-form";

// ----------------------------------------------------------------------

export default function CheckResultDetails() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const [details,setDetails] = useState();

  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    async function fetchData(){
        await axios.get(`/api/checkResult/get/${id}`).then(response=>{
            const {details} = response.data;
            setDetails(details);
            setIsLoading(false);
        });
    }
    fetchData();
  },[id])

  // const invoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: details?.invoiceNumber || '' },
          ]}
        />

      {
          isLoading?<div>Loading...</div>:
              <Invoice invoice={details} />
      }
      </Container>
    </Page>
  );
}
