import {Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {getBeneficiariesSelector} from '../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../store';
import axios from '../../../utils/axios';
import OrderAddProducts from './order-add-products';
import {OrderLineListTable} from './order-line-list-table';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const OrderCreateForm = ({isEdit, order, updateSummary}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { beneficiarySelector } = useSelector((state) => state.beneficiary);

  useEffect(() => {
    dispatch(getBeneficiariesSelector());
  }, [dispatch]);

  const handleNewProduct = (productLine) => {
    const orderLines = [...formik.values.orderLines];
    const originalOrderLine = orderLines.find((orderLine) => orderLine.productId === productLine.productId);
    let orderLine = {...originalOrderLine}

    if (!isEmpty(orderLine)) {
      orderLine.units = orderLine.units + 1;
      orderLines[orderLines.indexOf(originalOrderLine)] = orderLine;
    } else {
      const newOrderLine = {
        productId: productLine.productId,
        description: productLine.description,
        price: productLine.price,
        cost: productLine.cost,
        units: 1,
      };
      orderLines.push(newOrderLine);
    }

    updateSummary(orderLines);
    formik.setFieldValue('orderLines', orderLines);
  }

  const handleRemoveProduct = (productId) => {
    const orderLines = [...formik.values.orderLines];
    const originalOrderLine = orderLines.find((orderLine) => orderLine.productId === productId);
    let orderLine = {...originalOrderLine};

    if (!orderLine) {
      return;
    }

    if (orderLine.units !== 1) {
      orderLine.units = orderLine.units - 1;
      orderLines[orderLines.indexOf(originalOrderLine)] = orderLine;
    } else {
      orderLines.splice(orderLines.indexOf(originalOrderLine), 1);
    }

    updateSummary(orderLines);
    formik.setFieldValue('orderLines', orderLines);
  }

  const orderSchema = Yup.object().shape({
    beneficiaryId: Yup.number(),
    orderLines: Yup.array().of(
      Yup.object().shape({
        productId: Yup.number(),
        description: Yup.string(),
        price: Yup.number(),
        cost: Yup.number(),
        productDescription: Yup.string(),
        units: Yup.number(),
      })
    )
  })

  const formik = useFormik({
    enableReinitialize: !!isEdit,
    initialValues: {
      beneficiaryId: order?.beneficiaryId || null,
      orderLines: order?.orderLines || [],
    },
    validationSchema: orderSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEdit) {
          await axios.put(`/api/v1/order/${order.id}`, {...formik.values});
          toast.success('Venta actualizada!');
        } else {
          await axios.post('/api/v1/order', {...formik.values})
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
              <Autocomplete
                autoHighlight
                noOptionsText="Sin opciones"
                id="controlled-demo"
                options={beneficiarySelector}
                getOptionLabel={(option) => `${option.name} (${option.id})`}
                value={beneficiarySelector.find((option) => {
                    if (option.id === formik.values.beneficiaryId) {
                      return option.id;
                    }
                  })
                }
                onChange={(event, newValue) => {
                  const value = newValue ? newValue.id : null;
                  formik.setFieldValue('beneficiaryId', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Beneficiario"
                    variant="standard"
                    error={Boolean(formik.touched.beneficiaryId && formik.errors.beneficiaryId)}
                    helperText={formik.touched.beneficiaryId && formik.errors.beneficiaryId}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
            display="flex"
            flexDirection="column"
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Listado de Productos
              </Typography>
            </Grid>
            <OrderAddProducts
              handleAddProduct={handleNewProduct}
            />
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
            display="flex"
            flexDirection="column"
          >
            <Grid
              item
              md={4}
              xs={12}
              mb={4}
            >
              <Typography variant="h6">
                Lineas de Venta
              </Typography>
            </Grid>
            <OrderLineListTable
              orderLines={formik.values.orderLines}
              handleRemoveLine={handleRemoveProduct}
            />
          </Grid>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'right',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        <NextLink
          href="/dashboard/orders"
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
          { isEdit ? 'Actualizar' : 'Nueva Venta'}
        </Button>
      </Box>
    </form>
  );
};
