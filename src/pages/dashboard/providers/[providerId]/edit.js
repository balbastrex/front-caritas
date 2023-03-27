import {useRouter} from 'next/router';
import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import {ProviderCreateForm} from '../../../../components/dashboard/provider/provider-create-form';
import { gtm } from '../../../../lib/gtm';
import {getProviderById} from '../../../../slices/provider';
import {useDispatch, useSelector} from '../../../../store';
import { getInitials } from '../../../../utils/get-initials';

const ProviderEdit = () => {
  const dispatch = useDispatch();
  const { provider } = useSelector((state) => state.provider);
  const router = useRouter()
  const { providerId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getProviderById(providerId));
    },
    []);

  if (!provider) {
    return null;
  }

  return <>
    <Head>
      <title>
        Dashboard: Editar Proveedor
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <NextLink href="/dashboard/providers" passHref legacyBehavior>
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          <Avatar
            src={provider.avatar}
            sx={{
              height: 64,
              mr: 2,
              width: 64
            }}
          >
            {getInitials(provider.name)}
          </Avatar>
          <div>
            <Typography
              noWrap
              variant="h4"
            >
              {provider.name}
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <Typography variant="subtitle2">
                provider_id:
              </Typography>
              <Chip
                label={provider.id}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </div>
        </Box>
        <Box mt={3}>
          <ProviderCreateForm isEdit provider={provider} />
        </Box>
      </Container>
    </Box>
  </>;
};

ProviderEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProviderEdit;
