import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Avatar, Box, Chip, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {AuthGuard} from '../../../../components/authentication/auth-guard';
import {BeneficiaryCreateForm} from '../../../../components/dashboard/beneficiary/beneficiary-create-form';
import {DashboardLayout} from '../../../../components/dashboard/dashboard-layout';
import {gtm} from '../../../../lib/gtm';
import {getBeneficiaryById} from '../../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../../store';
import {getInitials} from '../../../../utils/get-initials';

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { beneficiary } = useSelector((state) => state.beneficiary);
  const router = useRouter()
  const { beneficiaryId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getBeneficiaryById(beneficiaryId));
    },
    [dispatch]);

  if (!beneficiary) {
    return null;
  }

  return <>
    <Head>
      <title>
        Dashboard: Editar Beneficiario
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          <Avatar
            src={beneficiary.avatar}
            sx={{
              height: 64,
              mr: 2,
              width: 64
            }}
          >
            {getInitials(beneficiary.name)}
          </Avatar>
          <div>
            <Typography
              noWrap
              variant="h4"
            >
              {beneficiary.name}
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
                beneficiario_id:
              </Typography>
              <Chip
                label={beneficiary.id}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </div>
        </Box>
        <Box mt={3}>
          {
            beneficiary && (
              <BeneficiaryCreateForm isEdit={true} beneficiary={beneficiary} />
            )
          }
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
