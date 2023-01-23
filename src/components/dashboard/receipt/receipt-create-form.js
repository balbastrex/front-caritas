import {Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {getProducts} from '../../../slices/product';
import {getProviders} from '../../../slices/provider';
import {useDispatch, useSelector} from '../../../store';
import axios from '../../../utils/axios';
import {ReceiptLineListTable} from './receipt-line-list-table';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const ReceiptCreateForm = ({isEdit, receipt, updateSummary}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { providerList } = useSelector((state) => state.provider);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProviders());
  }, [dispatch]);

  const handleNewProduct = () => {
    const productId = formik.values.productId;
    const receiptLines = [...formik.values.receiptLines];
    const originalReceiptLine = receiptLines.find((receiptLine) => receiptLine.productId === productId);
    let receiptLine = {...originalReceiptLine}

    if (!isEmpty(receiptLine)) {
      receiptLine.units = receiptLine.units + formik.values.units;
      receiptLine.cost = formik.values.cost;
      const bi = formik.values.cost * receiptLine.units;
      receiptLine.totalCost = ((bi * formik.values.iva) / 100) + bi;
      receiptLines[receiptLines.indexOf(originalReceiptLine)] = receiptLine;
    } else {
      const bi = formik.values.cost * formik.values.units;
      const newReceiptLine = {
        productId: formik.values.productId,
        description: productList.find((product) => product.id === formik.values.productId)?.name,
        cost: formik.values.cost,
        totalCost: ((bi * formik.values.iva) / 100) + bi,
        units: formik.values.units,
      };
      receiptLines.push(newReceiptLine);
    }

    updateSummary({receiptLines});
    formik.setFieldValue('receiptLines', receiptLines);

    formik.setFieldValue('productId', null);
    formik.setFieldValue('units', null);
    formik.setFieldValue('cost', null);
    formik.setFieldValue('iva', 10);
    setClear(!clear);
  }

  const handleRemoveProduct = (productId) => {
    const receiptLines = [...formik.values.receiptLines];
    const originalReceiptLine = receiptLines.find((receiptLine) => receiptLine.productId === productId);
    let receiptLine = {...originalReceiptLine};

    if (!receiptLine) {
      return;
    }

    receiptLines.splice(receiptLines.indexOf(originalReceiptLine), 1);

    updateSummary({receiptLines});
    formik.setFieldValue('receiptLines', receiptLines);
  }

  const handleRemoveUnitProduct = (productId) => {
    const receiptLines = [...formik.values.receiptLines];
    const originalReceiptLine = receiptLines.find((receiptLine) => receiptLine.productId === productId);
    let receiptLine = {...originalReceiptLine};

    if (!receiptLine) {
      return;
    }

    if (receiptLine.units !== 1) {
      receiptLine.units = receiptLine.units - 1;
      const bi = receiptLine.cost * receiptLine.units;
      receiptLine.totalCost = ((bi * formik.values.iva) / 100) + bi;
      receiptLines[receiptLines.indexOf(originalReceiptLine)] = receiptLine;
    } else {
      receiptLines.splice(receiptLines.indexOf(originalReceiptLine), 1);
    }

    updateSummary({receiptLines});
    formik.setFieldValue('receiptLines', receiptLines);
  }

  const amountChange = (event) => {
    formik.handleChange(event);
    updateSummary({ totalReceipt: event.target.value });
  }

  const receiptSchema = Yup.object().shape({
    providerId: Yup.number().required('El proveedor es requerido.'),
    albaran: Yup.string().required('El número de Albarán es requerido.'),
    amount: Yup.number().required('El precio total del Albarán es requerido.'),
    receiptLines: Yup.array().of(
      Yup.object().shape({
        productId: Yup.number(),
        description: Yup.string(),
        cost: Yup.number(),
        iva: Yup.number(),
        units: Yup.number(),
      })
    )
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      providerId: receipt?.providerId || null,
      albaran: receipt?.albaran || '',
      amount: receipt?.amount || null,
      productId: 0,
      units: null,
      cost: null,
      iva: 10,
      receiptLines: receipt?.receiptLines || [],
    },
    validationSchema: receiptSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEdit) {
          await axios.put(`/api/v1/receipt/${receipt.id}`, {...formik.values});
          toast.success('Albarán actualizado!');
        } else {
          await axios.post('/api/v1/receipt/', {...formik.values})
          toast.success('Albarán Creado!');
        }
        router.push('/dashboard/receipts').catch(console.error);
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
                Detalle Albarán
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
                options={providerList}
                getOptionLabel={(option) => `${option.name}`}
                value={providerList.find((option) => {
                  if (option.id === formik.values.providerId) {
                    return option.id;
                  }
                })
                }
                onChange={(event, newValue) => {
                  const value = newValue ? newValue.id : null;
                  formik.setFieldValue('providerId', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proveedor"
                    variant="standard"
                    error={Boolean(formik.touched.providerId && formik.errors.providerId)}
                    helperText={formik.touched.providerId && formik.errors.providerId}
                  />
                )}
              />
              <TextField
                error={Boolean(formik.touched.albaran && formik.errors.albaran)}
                fullWidth
                label="NºAlbarán"
                name="albaran"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.albaran}
                helperText={formik.touched.albaran && formik.errors.albaran}
              />
              <TextField
                error={Boolean(formik.touched.amount && formik.errors.amount)}
                fullWidth
                label="Total"
                name="amount"
                onBlur={formik.handleBlur}
                onChange={amountChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.amount}
                helperText={formik.touched.amount && formik.errors.amount}
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
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Producto
              </Typography>
            </Grid>

            <Grid
              item
              md={8}
              xs={12}
            >
              <Autocomplete
                key={clear}
                autoHighlight
                autoSelect
                noOptionsText="Sin opciones"
                id="controlled-demo"
                options={productList}
                getOptionLabel={(option) => `${option.name} (${option.id})`}

                /*value={productList.find((option) => {
                  if (option.id === formik.values.productId) {
                    return option.id;
                  }
                })
                }*/
                onChange={(event, newValue) => {
                  const value = newValue ? newValue.id : null;
                  formik.setFieldValue('productId', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Producto"
                    variant="standard"
                    // error={Boolean(formik.touched.productId && formik.errors.productId)}
                    // helperText={formik.touched.productId && formik.errors.productId}
                  />
                )}
              />
              <Grid
                container
                sx={{ mt: 2}}
                md={12}
                xs={12}
                spacing={2}
              >
                <Grid
                  item
                  md={2}
                  xs={12}
                >
                  <TextField
                    // error={Boolean(formik.touched.units && formik.errors.units)}
                    key={clear}
                    fullWidth
                    label="Cantidad"
                    name="units"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.units}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    // error={Boolean(formik.touched.cost && formik.errors.cost)}
                    key={clear}
                    fullWidth
                    label="Precio (Sin IVA)"
                    name="cost"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.cost}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    // error={Boolean(formik.touched.iva && formik.errors.iva)}
                    fullWidth
                    label="IVA %"
                    name="iva"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.iva}
                  />
                </Grid>
                <Grid
                  item
                  md={2}
                >
                  <Button
                    sx={{ m: 1, height: 56, mt: 0 }}
                    variant="contained"
                    onClick={handleNewProduct}
                  >
                    Añadir
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <ReceiptLineListTable
            receiptLines={formik.values.receiptLines}
            handleRemoveLine={handleRemoveUnitProduct}
            handleRemoveProduct={handleRemoveProduct}
          />
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
        <NextLink
          href="/dashboard/receipts"
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
        {!isEdit && (
          <Button
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
          >
            { isEdit ? 'Actualizar' : 'Crear'}
          </Button>)
        }

      </Box>
    </form>
  );
};
