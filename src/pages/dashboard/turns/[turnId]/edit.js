import {useRouter} from 'next/router';
import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import {ProductCreateForm} from '../../../../components/dashboard/product/product-create-form';
import {TurnCreateForm} from '../../../../components/dashboard/turn/turn-create-form';
import { gtm } from '../../../../lib/gtm';
import {getTurnById} from '../../../../slices/turn';
import {useDispatch, useSelector} from '../../../../store';
import { getInitials } from '../../../../utils/get-initials';

const TurnEdit = () => {
  const dispatch = useDispatch();
  const { turn } = useSelector((state) => state.turn);
  const router = useRouter()
  const { turnId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getTurnById(turnId));
    },
    []);

  if (!turn) {
    return null;
  }

  return <>
    <Head>
      <title>
        Dashboard: Editar Turno
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
          <NextLink href="/dashboard/turns" passHref legacyBehavior>
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
                Turnos
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
            src={turn.avatar}
            sx={{
              height: 64,
              mr: 2,
              width: 64
            }}
          >
            {getInitials(turn.name)}
          </Avatar>
          <div>
            <Typography
              noWrap
              variant="h4"
            >
              {turn.name}
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
                product_id:
              </Typography>
              <Chip
                label={turn.id}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </div>
        </Box>
        <Box mt={3}>
          <TurnCreateForm isEdit turn={turn} />
        </Box>
      </Container>
    </Box>
  </>;
};

TurnEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default TurnEdit;
