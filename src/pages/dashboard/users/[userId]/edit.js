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
import {UserCreateForm} from '../../../../components/dashboard/user/user-create-form';
import { gtm } from '../../../../lib/gtm';
import {getTurnById} from '../../../../slices/turn';
import {getUserById} from '../../../../slices/user';
import {useDispatch, useSelector} from '../../../../store';
import { getInitials } from '../../../../utils/get-initials';

const UserEdit = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter()
  const { userId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getUserById(userId));
    },
    []);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Editar Usuario
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
              href="/dashboard/users"
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
                  Usuarios
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
              src={user.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(user.name)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {user.name}
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
                  user_id:
                </Typography>
                <Chip
                  label={user.id}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <UserCreateForm isEdit user={user} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default UserEdit;
