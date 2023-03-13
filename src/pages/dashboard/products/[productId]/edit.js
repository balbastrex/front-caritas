import {useRouter} from 'next/router';
import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import {ProductCreateForm} from '../../../../components/dashboard/product/product-create-form';
import { gtm } from '../../../../lib/gtm';
import {getProductById} from '../../../../slices/product';
import {useDispatch, useSelector} from '../../../../store';
import { getInitials } from '../../../../utils/get-initials';

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const router = useRouter()
  const { productId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getProductById(productId));
    },
    []);

  if (!product) {
    return null;
  }

  return <>
    <Head>
      <title>
        Dashboard: Editar Producto
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
          <NextLink href="/dashboard/products" passHref legacyBehavior>
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
                Productos
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
            src={product.avatar}
            sx={{
              height: 64,
              mr: 2,
              width: 64
            }}
          >
            {getInitials(product.name)}
          </Avatar>
          <div>
            <Typography
              noWrap
              variant="h4"
            >
              {product.name}
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
                label={product.id}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </div>
        </Box>
        <Box mt={3}>
          <ProductCreateForm isEdit product={product} />
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
