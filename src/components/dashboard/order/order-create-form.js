import {Box, Button, Card, CardContent, FormHelperText, Grid, MenuItem, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {getBeneficiariesSelector} from '../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../store';
import axios from '../../../utils/axios';

export const OrderCreateForm = ({isEdit, order}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { beneficiarySelector } = useSelector((state) => state.beneficiary);

  useEffect(() => {
    dispatch(getBeneficiariesSelector());
  }, [dispatch]);

  const orderSchema = Yup.object().shape({
    beneficiaryId: Yup.number().required('El beneficiario es requerido'),
    amount: Yup.number(),
    orderLines: Yup.array().of(
      Yup.object().shape({
        productId: Yup.number().required('El producto es requerido'),
        quantity: Yup.number().required('La cantidad es requerida'),
      })
    )
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      beneficiaryId: order?.beneficiaryId || 0,
      amount: order?.amount || 0,
      orderLines: order?.orderLines || [],
    },
    validationSchema: orderSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEdit) {
          await axios.put(`/api/v1/order/${order.id}`, {...formik.values});
          toast.success('Venta actualizada!');
        } else {
          await axios.post('/api/v1/order/', {...formik.values})
          toast.success('Venta Creada!');
        }
        router.push('/dashboard/orders').catch(console.error);
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
                Beneficiario
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="Beneficiario"
                name="beneficiaryId"
                onChange={formik.handleChange}
                select
                SelectProps={{ native: true }}
                value={formik.values.beneficiaryId}
                variant="outlined"
              >
                <option value={0}>Seleccione un beneficiario</option>
                {beneficiarySelector.map((beneficiary) => (
                  <option
                    key={beneficiary.id}
                    value={beneficiary.id}
                  >
                    {beneficiary.name} {beneficiary.lastName}
                  </option>
                ))}
              </TextField>
              <FormHelperText error>
                {formik.touched.beneficiaryId && formik.errors.beneficiaryId}
              </FormHelperText>
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
                Lineas de Venta
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              {/*<TextField
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
              />*/}
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
        <NextLink
          href="/dashboard/products"
          passHref
        >
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
