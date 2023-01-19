import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Button, Card, Container, Grid, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../../../components/authentication/auth-guard';
import {BeneficiaryListTable} from '../../../../../components/dashboard/beneficiary/beneficiary-list-table';
import {BeneficiaryNotesTable} from '../../../../../components/dashboard/beneficiary/beneficiary-notes-table';
import {DashboardLayout} from '../../../../../components/dashboard/dashboard-layout';
import {Plus as PlusIcon} from '../../../../../icons/plus';
import {getBeneficiaryNotes} from '../../../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../../../store';

const BeneficiaryNotesList = () => {
  const dispatch = useDispatch();
  const { beneficiaryAndNotesList } = useSelector((state) => state.beneficiary);
  const router = useRouter()
  const { beneficiaryId } = router.query
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getBeneficiaryNotes(beneficiaryId));
  }, [dispatch]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const removeNote = (noteId) => {
    console.log('remove note ', noteId)
  };

  return (
    <>
      <Head>
        <title>
          Notas
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/dashboard/beneficiaries"
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
                  Beneficiarios
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Notas del Beneficiario {beneficiaryAndNotesList.beneficiaryName}
                </Typography>
              </Grid>
              <Grid item>
                <NextLink
                  href={`/dashboard/beneficiaries/${beneficiaryId}/notes/new`}
                  passHref
                >
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Nueva Nota
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <BeneficiaryNotesTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              notes={beneficiaryAndNotesList.notes}
              notesCount={beneficiaryAndNotesList.notes.length}
              rowsPerPage={rowsPerPage}
              beneficiaryId={beneficiaryId}
              handleRemoveNote={removeNote}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
}

BeneficiaryNotesList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default BeneficiaryNotesList;
