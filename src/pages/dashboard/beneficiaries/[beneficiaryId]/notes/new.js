import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {NoteCreateForm} from '../../../../../components/dashboard/note/note-create-form';
import {AuthGuard} from '../../../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../../../components/dashboard/dashboard-layout';
import {gtm} from '../../../../../lib/gtm';

const NoteCreate = () => {
  const router = useRouter()
  const { beneficiaryId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return <>
    <Head>
      <title>
        Dashboard: Nueva Nota
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
            href={`/dashboard/beneficiaries/${beneficiaryId}/notes`}
            passHref
            legacyBehavior>
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
                Notas
              </Typography>
            </Link>
          </NextLink>
        </Box>
        <NoteCreateForm beneficiaryId={beneficiaryId} />
      </Container>
    </Box>
  </>;
};

NoteCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default NoteCreate;
