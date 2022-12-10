import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Container, Link, Typography } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProductCreateForm } from '../../../components/dashboard/product/product-create-form';
import {ProviderCreateForm} from '../../../components/dashboard/provider/provider-create-form';
import {TurnCreateForm} from '../../../components/dashboard/turn/turn-create-form';
import { gtm } from '../../../lib/gtm';

const ProviderCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Nuevo Proveedor
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
            <NextLink
              href="/dashboard/turns"
              passHref
            >
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
                  Proveedores
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <ProviderCreateForm />
        </Container>
      </Box>
    </>
  );
};

ProviderCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProviderCreate;
