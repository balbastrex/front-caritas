import {useRouter} from 'next/router';
import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {defaultURLProfile} from '../components/authentication/allowed-route-profiles';
import {useAuth} from '../hooks/use-auth';
import { gtm } from '../lib/gtm';

const AuthorizationRequired = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const backNavigation = user?.profileId ? defaultURLProfile[user.profileId] : '/';

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Error: Autorización Requerida
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            align="center"
            variant={mobileDevice ? 'h4' : 'h1'}
          >
            401: Autorización Requerida
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            sx={{ mt: 0.5 }}
            variant="subtitle2"
          >
            Estás intentando acceder a una página que requiere autorización.
            Intenta usar los botones de navegación.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <Box
              alt="Under development"
              component="img"
              src={`/static/error/error401_${theme.palette.mode}.svg`}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <NextLink
              href={backNavigation || '/dashboard'}
              passHref
            >
              <Button
                component="a"
                variant="outlined"
              >
                Volver a la página anterior
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AuthorizationRequired;
