import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Avatar, Box, Chip, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {AuthGuard} from '../../../../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../../../../components/dashboard/dashboard-layout';
import {NoteCreateForm} from '../../../../../../components/dashboard/note/note-create-form';
import {gtm} from '../../../../../../lib/gtm';
import {getNoteById} from '../../../../../../slices/note';
import {useDispatch, useSelector} from '../../../../../../store';
import {getInitials} from '../../../../../../utils/get-initials';

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { note } = useSelector((state) => state.note);
  const router = useRouter()
  const { beneficiaryId, noteId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getNoteById(noteId));
    },
    []);

  if (!note) {
    return null;
  }

  return <>
    <Head>
      <title>
        Dashboard: Editar Nota
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          <Avatar
            src={note.avatar}
            sx={{
              height: 64,
              mr: 2,
              width: 64
            }}
          >
            {getInitials(note.description)}
          </Avatar>
          <div>
            <Typography
              noWrap
              variant="h4"
            >
              Nota
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
                note_id:
              </Typography>
              <Chip
                label={note.id}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </div>
        </Box>
        <Box mt={3}>
          <NoteCreateForm isEdit note={note} beneficiaryId={beneficiaryId} />
        </Box>
      </Container>
    </Box>
  </>;
};

ProductEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProductEdit;
