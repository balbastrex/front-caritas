import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {BeneficiaryCreateForm} from '../../../components/dashboard/beneficiary/beneficiary-create-form';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {gtm} from '../../../lib/gtm';

const ProductCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return <>
    <Head>
      <title>
        Dashboard: Nuevo Beneficiario
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <NextLink href="/dashboard/beneficiaries" passHref legacyBehavior>
            <Link
              color="textPrimary"
              component="a"
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <ArrowBackIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle2">
                Beneficiarios
              </Typography>
            </Link>
          </NextLink>
        </Box>
        <BeneficiaryCreateForm />
      </Container>
    </Box>
  </>;
};

ProductCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProductCreate;
