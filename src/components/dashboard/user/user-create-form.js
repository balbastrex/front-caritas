import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {getBeneficiariesSelector} from '../../../slices/beneficiary';
import {getParishSelector, getRoles} from '../../../slices/user';
import {useDispatch, useSelector} from '../../../store';
import axios from '../../../utils/axios';
import {UserProfiles} from '../../../utils/constants';

export const UserCreateForm = ({isEdit, user}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showParishSelector, setShowParishSelector] = useState(false)

  const { roleList } = useSelector((state) => state.user);
  const { parishSelectorList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getParishSelector());
  }, [dispatch]);

  const userSchema = Yup.object().shape({
    name: Yup.string().required('El Nombre es requerido'),
    lastName: Yup.string(),
    phone: Yup.string(),
    email: Yup.string().required('El Email es requerido'),
    profileId: Yup.string().required('El Rol es requerido'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      email: user?.email || '',
      isActive: user?.isActive || true,
      profileId: user?.profileId || undefined,
      parishId: user?.profileId || undefined,
      password:  '',
    },
    validationSchema: userSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEdit) {
          await axios.put(`/api/v1/user/${user.id}`, {...formik.values});
          toast.success('Usuario actualizado!');
        } else {
          await axios.post('/api/v1/user', {...formik.values})
          toast.success('Usuario Creado!');
        }
        // NOTE: Make API request
        router.push('/dashboard/users').catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  console.log(formik.values)

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
                Detalle Usuario
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                label="Nombre"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
              />
              <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                label="Apellidos"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.lastName}
              />
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                label="Teléfono"
                name="phone"
                sx={{ mt: 2 }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.phone}
              />
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                label="Contraseña"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="password"
                value={formik.values.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Switch onChange={(event) => formik.setFieldValue('isActive', event.target.checked)}
                                   checked={formik.values.isActive} />}
                  label="Activo"
                />
              </Box>
              <Autocomplete
                autoHighlight
                noOptionsText="Sin opciones"
                id="controlled-demo"
                sx={{ mt: 2 }}
                options={roleList}
                getOptionLabel={(option) => `${option.name}`}
                value={roleList.find((option) => {
                  if (option.id === formik.values.profileId) {
                    return option.id;
                  }
                })
                }
                onChange={(event, newValue) => {
                  const value = newValue ? newValue.id : null;
                  formik.setFieldValue('profileId', value);
                  setShowParishSelector(newValue.id === UserProfiles.GESTOR_PARROQUIA)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rol"
                    variant="standard"
                    error={Boolean(formik.touched.profileId && formik.errors.profileId)}
                    helperText={formik.touched.profileId && formik.errors.profileId}
                  />
                )}
              />
              <Autocomplete
                disabled={!showParishSelector}
                autoHighlight
                noOptionsText="Sin opciones"
                id="controlled-demo"
                sx={{ mt: 2 }}
                options={parishSelectorList}
                getOptionLabel={(option) => `${option.name}`}
                value={parishSelectorList.find((option) => {
                  if (option.id === formik.values.parishId) {
                    return option.id;
                  }
                })
                }
                onChange={(event, newValue) => {
                  const value = newValue ? newValue.id : null;
                  formik.setFieldValue('parishId', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Parroquia"
                    variant="standard"
                    error={Boolean(formik.touched.parishId && formik.errors.parishId)}
                    helperText={formik.touched.parishId && formik.errors.parishId}
                  />
                )}
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
          href="/dashboard/users"
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
