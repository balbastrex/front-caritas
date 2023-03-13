import { useRouter } from 'next/router';
import NextLink from 'next/link';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import axios from '../../../utils/axios';

export const ProductCreateForm = ({isEdit, product}) => {
  const router = useRouter();

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Nombre es requerido'),
    costPrice: Yup.number().required('El precio de coste es requerido'),
    salesPrice: Yup.number().required('El precio de venta es requerido'),
    available: Yup.bool(),
    free: Yup.bool(),
    stock: Yup.number(),
    q1: Yup.number(),
    q2: Yup.number(),
    q3: Yup.number(),
    q4: Yup.number(),
    q5: Yup.number(),
    q6: Yup.number()
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || '',
      costPrice: product?.costPrice || undefined,
      salesPrice: product?.salesPrice || undefined,
      available: product? product.available : true,
      free: product ? product.free : false,
      stock: product?.stock || 0,
      q1: product?.q1 || undefined,
      q2: product?.q2 || undefined,
      q3: product?.q3 || undefined,
      q4: product?.q4 || undefined,
      q5: product?.q5 || undefined,
      q6: product?.q6 || undefined
    },
    validationSchema: productSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEdit) {
          await axios.put(`/api/v1/product/${product.id}`, {...formik.values});
          toast.success('Producto actualizado!');
        } else {
          await axios.post('/api/v1/product/', {...formik.values})
          toast.success('Producto Creado!');
        }
        // NOTE: Make API request
        router.push('/dashboard/products').catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Detalle Producto
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Nombre Producto"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
              />
              <TextField
                error={Boolean(formik.touched.costPrice && formik.errors.costPrice)}
                fullWidth
                label="P.C.E."
                name="costPrice"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.costPrice}
              />
              <TextField
                error={Boolean(formik.touched.salesPrice && formik.errors.salesPrice)}
                fullWidth
                label="P.V.E"
                name="salesPrice"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.salesPrice}
              />
              <TextField
                error={Boolean(formik.touched.stock && formik.errors.stock)}
                fullWidth
                label="Stock"
                name="stock"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.stock}
              />
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Switch onChange={(event) => formik.setFieldValue('free', event.target.checked)}
                                   checked={formik.values.free} />}
                  label="Gratuito"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Switch onChange={(event) => formik.setFieldValue('available', event.target.checked)}
                                   checked={formik.values.available} />}
                  label="Disponible"
                />
              </Box>
              {Boolean(formik.touched.description && formik.errors.description) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Máximos Unidad Familiar
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.q1 && formik.errors.q1)}
                // fullWidth
                label="UF1"
                name="q1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.q1}
              />
              <TextField
                error={Boolean(formik.touched.q2 && formik.errors.q2)}
                // fullWidth
                label="UF2"
                name="q2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.q2}
                sx={{ ml: 2 }}
              />
              <TextField
                error={Boolean(formik.touched.q3 && formik.errors.q3)}
                // fullWidth
                label="UF3"
                name="q3"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.q3}
                sx={{ mt: 2 }}
              />
              <TextField
                error={Boolean(formik.touched.q4 && formik.errors.q4)}
                // fullWidth
                label="UF4"
                name="q4"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.q4}
                sx={{ ml: 2, mt: 2 }}
              />
              <TextField
                error={Boolean(formik.touched.q5 && formik.errors.q5)}
                // fullWidth
                label="UF5"
                name="q5"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.q5}
                sx={{ mt: 2 }}
              />
              <TextField
                error={Boolean(formik.touched.q6 && formik.errors.q6)}
                // fullWidth
                label="UF6"
                name="q6"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.q6}
                sx={{ ml: 2, mt: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>



      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        <Button
          color="error"
          sx={{
            m: 1,
            mr: 'auto'
          }}
        >
          Delete
        </Button>
        <NextLink href="/dashboard/products" passHref legacyBehavior>
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            component="a"
            disabled={formik.isSubmitting}
          >
            Cancelar
          </Button>
        </NextLink>
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
        >
          { isEdit ? 'Actualizar' : 'Crear'}
        </Button>
      </Box>
    </form>
  );
};
