import {Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import {compareAsc} from 'date-fns';
import {useFormik} from 'formik';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {getBeneficiariesSelector} from '../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../store';
import axios from '../../../utils/axios';
import {ExceedCartModal} from './exceed-cart-modal';
import OrderAddProducts from './order-add-products';
import {OrderLineListTable} from './order-line-list-table';
import {ShowBeneficiaryNotesModal} from './show-beneficiary-notes-modal';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const OrderCreateForm = ({isEdit, order, updateSummary}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { beneficiarySelector } = useSelector((state) => state.beneficiary);
  const [beneficiaryUF, setBeneficiaryUF] = useState(1)
  const [showExceedModal, setShowExceedModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [notes, setNotes] = useState([])
  const [prodLine, setProdLine] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(getBeneficiariesSelector());
  }, [dispatch]);

  useEffect(() => {
    if (beneficiarySelector && isEdit) {
      const beneficiary = beneficiarySelector.find(b => b.id === order.beneficiaryId);
      updateSummary({budget: beneficiary?.budget, lastDateOrder: beneficiary?.lastDateOrder});
    }
  }, [beneficiarySelector])

  const handleShowExceedModal = (productLine) => {
    const orderLines = [...formik.values.orderLines];
    const originalOrderLine = orderLines.find((orderLine) => orderLine.productId === productLine.productId);
    let orderLine = {...originalOrderLine}
    const units  = orderLine.units ? orderLine.units + 1 : 1;

    if(units > productLine.maxUnits){
      setProdLine(productLine);
      setShowExceedModal(true);
    } else {
      handleNewProduct(productLine)
    }
  }

  const handleNewProduct = (newLine) => {
    const productLine = prodLine ? prodLine : newLine;
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
        maxUnits: productLine.maxUnits,
      };
      orderLines.push(newOrderLine);
    }

    updateSummary({orderLines});
    formik.setFieldValue('orderLines', orderLines);

    setShowExceedModal(false);
    setProdLine(null)
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

    updateSummary({orderLines});
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
        maxUnits: Yup.number(),
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
      if (isSubmitting) {
        return;
      }
      try {
        setIsSubmitting(true);
        if (isEdit) {
          await axios.put(`/api/v1/order/${order.id}`, {...formik.values});
          toast.success('Venta actualizada!');
        } else {
          await axios.post('/api/v1/order', {...formik.values})
          toast.success('Venta Creada!');
        }
        router.push('/dashboard/orders').catch(console.error);
      } catch (err) {
        setIsSubmitting(false);
        console.error(err);
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      {showNotesModal && (<ShowBeneficiaryNotesModal notes={notes} handleClose={() => setShowNotesModal(false) } />)}
      {showExceedModal && (<ExceedCartModal handleCloseCart={handleNewProduct} handleClose={() => setShowExceedModal(false) } />)}
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
                md={6}
                xs={12}
              >
                <Autocomplete
                  autoHighlight
                  disabled={isEdit || formik.values.orderLines.length > 0}
                  noOptionsText="Sin opciones"
                  id="controlled-demo"
                  options={beneficiarySelector}
                  getOptionLabel={(option) => `${option.name} (${option.license})`}
                  value={beneficiarySelector.find((option) => {
                      if (option.id === formik.values.beneficiaryId) {
                        return option.id;
                      }
                    })
                  }
                  onChange={(event, newValue) => {
                    const value = newValue ? newValue.id : null;
                    formik.setFieldValue('beneficiaryId', value);
                    const beneficiary = beneficiarySelector.find((beneficiary) => beneficiary.id === value);
                    if (beneficiary) {
                      setBeneficiaryUF(beneficiary.familyUnit);
                      updateSummary({budget: beneficiary.budget, lastDateOrder: beneficiary.lastDateOrder});
                      setNotes(beneficiary.notes);
                      const expires = new Date(beneficiary.expires);
                      const expiresDifference = compareAsc(expires, Date.now());
                      expiresDifference < 0 && toast.error('El beneficiario tiene el carnet expirado');
                    }
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
              <Grid
                md={2}
                xs={12}
                sx={{ textAlign: 'center', pt: 2, pl: 2 }}
              >
                <Button
                  onClick={() => setShowNotesModal(true)}
                  disabled={!formik.values.beneficiaryId}
                  size="large"
                  style={{ backgroundColor: formik.values.beneficiaryId ? '#FFB020' : '#595757',color: 'black', marginRight: '15px' }}
                >
                  Ver Notas
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }} >
          {
            formik.values.beneficiaryId && (
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
                    handleAddProduct={handleShowExceedModal}
                    beneficiaryUF={beneficiaryUF}
                    orderLines={formik.values.orderLines}
                  />
                </Grid>
              </CardContent>
            )
          }
          {
            !formik.values.beneficiaryId && (
              <CardContent>
                <Grid
                  container
                  spacing={3}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  height={150}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <Typography variant="h6">
                      Para empezar a añadir productos, primero debes seleccionar un beneficiario
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            )
          }
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
    </>
  );
};
