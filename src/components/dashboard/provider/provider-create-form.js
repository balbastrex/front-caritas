import {Box, Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import axios from '../../../utils/axios';

export const ProviderCreateForm = ({isEdit, provider}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const turnSchema = Yup.object().shape({
    name: Yup.string().required('El nombre del Proveedor es requerido'),
    description: Yup.string(),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: provider?.name || '',
    },
    validationSchema: turnSchema,
    onSubmit: async (values, helpers) => {
      if (isSubmitting) {
        return;
      }
      try {
        setIsSubmitting(true);
        if (isEdit) {
          await axios.put(`/api/v1/provider/${provider.id}`, {...formik.values});
          toast.success('Proveedor actualizado!');
        } else {
          await axios.post('/api/v1/provider', {...formik.values})
          toast.success('Proveedor Creado!');
        }
        // NOTE: Make API request
        router.push('/dashboard/providers').catch(console.error);
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
                Detalle Proveedor
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
                label="Nombre Proveedor"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
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
        <NextLink
          href="/dashboard/providers"
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
