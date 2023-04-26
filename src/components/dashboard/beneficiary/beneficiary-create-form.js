import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid, MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {getAuthorizationTypes} from '../../../slices/authorizationType';
import {createBeneficiary, updateBeneficiary} from '../../../slices/beneficiary';
import {getCitizenTypes} from '../../../slices/citizenType';
import {getCivilTypes} from '../../../slices/civilStateType';
import {getCountries} from '../../../slices/countries';
import {getEducationTypes} from '../../../slices/educationType';
import {getEmploymentTypes} from '../../../slices/employmentType';
import {getFamilyTypes} from '../../../slices/familyType';
import {getGuardianshipTypes} from '../../../slices/guardianshipType';
import {getParishes} from '../../../slices/parish';
import {getTurns} from '../../../slices/turn';
import {useDispatch, useSelector} from '../../../store';
import axios from '../../../utils/axios';
import {ExceedCartModal} from '../order/exceed-cart-modal';
import {BeneficiaryLicenseModal} from './beneficiary-license-modal';

const genderType = [
  {
    value: 'Mujer'
  },
  {
    value: 'Hombre'
  }
];

export const BeneficiaryCreateForm = ({isEdit = false, beneficiary}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showBeneficiaryLicenseModal, setShowBeneficiaryLicenseModal] = useState(false)
  const [newLicense, setNewLicense] = useState(0)

  const { countryList } = useSelector((state) => state.countries);
  const { familyTypeList } = useSelector((state) => state.familytype);
  const { citizenTypeList } = useSelector((state) => state.citizentype);
  const { civilStateTypeList } = useSelector((state) => state.civilstatetype);
  const { employmentTypeList } = useSelector((state) => state.employmenttype);
  const { guardianshipTypeList } = useSelector((state) => state.guardianshiptype);
  const { educationTypeList } = useSelector((state) => state.educationtype);
  const { authorizationTypeList } = useSelector((state) => state.authorizationtype);
  const { parishList } = useSelector((state) => state.parish);
  const { turnList } = useSelector((state) => state.turn);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getFamilyTypes());
    dispatch(getCitizenTypes());
    dispatch(getCivilTypes());
    dispatch(getEmploymentTypes());
    dispatch(getGuardianshipTypes());
    dispatch(getEducationTypes());
    dispatch(getAuthorizationTypes());
    dispatch(getParishes());
    dispatch(getTurns());
  }, []);

  const beneficiarySchema = Yup.object().shape({
    cif: Yup.string().required('El NIF/NIE es requerido'),
    name: Yup.string().required('El nombre es requerido'),
    lastname1: Yup.string().required('El primer apellido es requerido'),
    address: Yup.string().required('La dirección es requerida'),
    state: Yup.string().required('La provincia es requerida'),
    city: Yup.string().required('La ciudad es requerida'),
    // email: Yup.string().email('El email introducido no es válido'),
    birthDate: Yup.date().required('La fecha de nacimiento es requerida'),
    expires: Yup.date()
      // .typeError('Se espera un valor de tipo Fecha pero has introducido un ${value}')
      .required('La fecha de expiración es requerida'),
    adults: Yup.number().required('El número de adultos es requerido'),
    minors: Yup.number().required('El número de menores es requerido'),
  })

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      id: beneficiary?.id || 0,
      license: beneficiary?.license || 0,
      name: beneficiary?.name || '',
      lastname1: beneficiary?.lastname1 || '',
      lastname2: beneficiary?.lastname2 || '',
      cif: beneficiary?.cif || '',
      adults: beneficiary?.adults || undefined,
      minors: beneficiary? beneficiary.minors : 0,
      phone: beneficiary? beneficiary.phone : 0,
      email: beneficiary? beneficiary.email : '',
      address: beneficiary? beneficiary.address : '',
      city: beneficiary? beneficiary.city : '',
      state: beneficiary? beneficiary.state : '',
      zip: beneficiary? beneficiary.zip : '',
      free: beneficiary ? beneficiary.free : false,
      nationalityId: beneficiary?.nationalityId ? beneficiary.nationalityId : '',
      birthDate: beneficiary ? beneficiary.birthDate : new Date(),
      childrenUnder18: beneficiary ? beneficiary.childrenUnder18 : 0,
      childrenOver18: beneficiary ? beneficiary.childrenOver18 : 0,
      homeless: beneficiary ? beneficiary.homeless : false,
      gender: beneficiary ? beneficiary.gender : '',
      expires: beneficiary ? beneficiary.expires : new Date(),
      gratuitous: beneficiary?.gratuitous || 0,
      sice: beneficiary?.sice || 0,
      needsPrint: beneficiary?.needsPrint || false,
      familyTypeId: beneficiary?.familyTypeId ? beneficiary.familyTypeId : '',
      citizenTypeId: beneficiary?.citizenTypeId ? beneficiary.citizenTypeId : '',
      civilStateTypeId: beneficiary?.civilStateTypeId ? beneficiary.civilStateTypeId : '',
      employmentTypeId: beneficiary?.employmentTypeId ? beneficiary.employmentTypeId : '',
      guardianshipTypeId: beneficiary?.guardianshipTypeId ? beneficiary.guardianshipTypeId : '',
      educationTypeId: beneficiary?.educationTypeId ? beneficiary.educationTypeId : '',
      authorizationTypeId: beneficiary?.authorizationTypeId ? beneficiary.authorizationTypeId : '',
      parishId: beneficiary?.parishId || parishList[0]?.id,
      turnId: beneficiary?.turnId || turnList[0]?.id,
    },
    validationSchema: beneficiarySchema,
    onSubmit: async (values, helpers) => {
      if (isSubmitting) {
        return;
      }
      try {
        setIsSubmitting(true);
        if (isEdit) {
          dispatch(updateBeneficiary({...formik.values}));
          toast.success('Beneficiario actualizado!');
        } else {
            // dispatch(createBeneficiary({...formik.values}));
            axios.post('/api/v1/beneficiary', {
              ...formik.values
            }).then((response) => {
              setNewLicense(response.data.license);
              setShowBeneficiaryLicenseModal(true);
            })
            toast.success('Beneficiario Creado.');
        }
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

  const handleCloseModal = () => {
    setShowBeneficiaryLicenseModal(false)
    router.push('/dashboard/beneficiaries').catch(console.error);
  }

  return (
    <>
      {showBeneficiaryLicenseModal && (<BeneficiaryLicenseModal handleClose={handleCloseModal} license={newLicense} />)}
      {
        showBeneficiaryLicenseModal ? null : (
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
                      Identificación
                    </Typography>
                    <Typography variant="subtitle2">
                      Si dejas un 0 en el carnet, se generará automáticamente
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    spacing={3}
                    md={8}
                    xs={12}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.license && formik.errors.license)}
                        helperText={formik.touched.license && formik.errors.license}
                        fullWidth
                        label="Carnet"
                        name="license"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.license}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.sice && formik.errors.sice)}
                        helperText={formik.touched.sice && formik.errors.sice}
                        fullWidth
                        label="SICE"
                        name="sice"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.sice}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <DatePicker
                        error={Boolean(formik.touched.expires && formik.errors.expires)}
                        helperText={formik.touched.expires && formik.errors.expires}
                        inputFormat="dd/MM/yyyy"
                        label="Expiración (dd/mm/yyyy)"
                        name="expires"
                        onChange={(value) => {
                          formik.setFieldValue('expires', value);
                        }}
                        renderInput={(inputProps) => <TextField {...inputProps} />}
                        value={formik.values.expires}
                      />
                    </Grid>
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
                      Detalles Personales
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    spacing={3}
                    md={8}
                    xs={12}
                  >
                    <Grid
                      item
                      md={12}
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
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.lastname1 && formik.errors.lastname1)}
                        helperText={formik.touched.lastname1 && formik.errors.lastname1}
                        fullWidth
                        label="Apellido 1"
                        name="lastname1"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.lastname1}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Apellido 2"
                        name="lastname2"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.lastname2}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.cif && formik.errors.cif)}
                        helperText={formik.touched.cif && formik.errors.cif}
                        fullWidth
                        label="NIF/NIE"
                        name="cif"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.cif}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.nationalityId}
                        fullWidth
                        label="Nacionalidad"
                        select
                        name="nationalityId"
                        onChange={formik.handleChange}
                      >
                        {countryList.map((country) => (
                          <MenuItem
                            key={country.id}
                            value={country.id}
                          >
                            {country.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.gender}
                        fullWidth
                        label="Sexo"
                        select
                        name="gender"
                        onChange={formik.handleChange}
                      >
                        {genderType.map((gender) => (
                          <MenuItem
                            key={gender.value}
                            value={gender.value}
                          >
                            {gender.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <DatePicker
                        required
                        error={Boolean(formik.touched.birthDate && formik.errors.birthDate)}
                        helperText={formik.touched.birthDate && formik.errors.birthDate}
                        inputFormat="dd/MM/yyyy"
                        label="F.Nacimiento(dd/mm/yyyy) *"
                        name="birthDate"
                        onChange={(value) => {
                          formik.setFieldValue('birthDate', value);
                        }}
                        renderInput={(inputProps) => <TextField {...inputProps} />}
                        value={formik.values.birthDate}
                      />
                    </Grid>
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
                      Datos de Contacto
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    md={8}
                    xs={12}
                    spacing={3}
                  >
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.address && formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        fullWidth
                        label="Dirección"
                        name="address"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.address}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.state && formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                        fullWidth
                        label="Provincia"
                        name="state"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.state}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.city && formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        fullWidth
                        label="Localidad"
                        name="city"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.city}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.zip && formik.errors.zip)}
                        helperText={formik.touched.zip && formik.errors.zip}
                        fullWidth
                        label="Código Postal"
                        name="zip"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.zip}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        fullWidth
                        label="Email"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.email}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.phone && formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        fullWidth
                        label="Teléfono"
                        name="phone"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.phone}
                      />
                    </Grid>
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
                      Situación 1
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    md={8}
                    xs={12}
                    spacing={3}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Box sx={{ mt: 2 }}>
                        <FormControlLabel
                          control={<Switch onChange={(event) => formik.setFieldValue('free', event.target.checked)}
                                           checked={formik.values.free} />}
                          label="Libertad"
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Box sx={{ mt: 2 }}>
                        <FormControlLabel
                          control={<Switch onChange={(event) => formik.setFieldValue('homeless', event.target.checked)}
                                           checked={formik.values.homeless} />}
                          label="Sin techo"
                        />
                      </Box>
                    </Grid>

                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.familyTypeId}
                        fullWidth
                        label="Tipo de Familia"
                        select
                        name="familyTypeId"
                        onChange={formik.handleChange}
                      >
                        {familyTypeList.map((familyType) => (
                          <MenuItem
                            key={familyType.id}
                            value={familyType.id}
                          >
                            {familyType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.adults && formik.errors.adults)}
                        helperText={formik.touched.adults && formik.errors.adults}
                        fullWidth
                        label="Adultos"
                        name="adults"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.adults}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.minors && formik.errors.minors)}
                        helperText={formik.touched.minors && formik.errors.minors}
                        fullWidth
                        label="Menores"
                        name="minors"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.minors}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.childrenUnder18 && formik.errors.childrenUnder18)}
                        helperText={formik.touched.childrenUnder18 && formik.errors.childrenUnder18}
                        fullWidth
                        label="Mayores de 2 años"
                        name="childrenUnder18"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.childrenUnder18}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.childrenOver18 && formik.errors.childrenOver18)}
                        helperText={formik.touched.childrenOver18 && formik.errors.childrenOver18}
                        fullWidth
                        label="Menores de 2 años"
                        name="childrenOver18"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.childrenOver18}
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(formik.touched.gratuitous && formik.errors.gratuitous)}
                        helperText={formik.touched.gratuitous && formik.errors.gratuitous}
                        fullWidth
                        label="Gratuito (%)"
                        name="gratuitous"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.gratuitous}
                      />
                    </Grid>
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
                      Situación 2
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    md={8}
                    xs={12}
                    spacing={3}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.citizenTypeId}
                        fullWidth
                        label="Ciudadania"
                        select
                        name="citizenTypeId"
                        onChange={formik.handleChange}
                      >
                        {citizenTypeList.map((citizenType) => (
                          <MenuItem
                            key={citizenType.id}
                            value={citizenType.id}
                          >
                            {citizenType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.civilStateTypeId}
                        fullWidth
                        label="Estado civil"
                        select
                        name="civilStateTypeId"
                        onChange={formik.handleChange}
                      >
                        {civilStateTypeList.map((civilState) => (
                          <MenuItem
                            key={civilState.id}
                            value={civilState.id}
                          >
                            {civilState.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.employmentTypeId}
                        fullWidth
                        label="Situación laboral"
                        select
                        name="employmentTypeId"
                        onChange={formik.handleChange}
                      >
                        {employmentTypeList.map((employmentType) => (
                          <MenuItem
                            key={employmentType.id}
                            value={employmentType.id}
                          >
                            {employmentType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.guardianshipTypeId}
                        fullWidth
                        label="Custodia"
                        select
                        name="guardianshipTypeId"
                        onChange={formik.handleChange}
                      >
                        {guardianshipTypeList.map((guardianshipType) => (
                          <MenuItem
                            key={guardianshipType.id}
                            value={guardianshipType.id}
                          >
                            {guardianshipType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.educationTypeId}
                        fullWidth
                        label="Nivel de estudios"
                        select
                        name="educationTypeId"
                        onChange={formik.handleChange}
                      >
                        {educationTypeList.map((educationType) => (
                          <MenuItem
                            key={educationType.id}
                            value={educationType.id}
                          >
                            {educationType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.authorizationTypeId}
                        fullWidth
                        label="Autorización"
                        select
                        name="authorizationTypeId"
                        onChange={formik.handleChange}
                      >
                        {authorizationTypeList.map((authorizationType) => (
                          <MenuItem
                            key={authorizationType.id}
                            value={authorizationType.id}
                          >
                            {authorizationType.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

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
                      Parroquia
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    md={8}
                    xs={12}
                    spacing={3}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.parishId}
                        fullWidth
                        label="Parroquia asociada"
                        select
                        name="parishId"
                        onChange={formik.handleChange}
                      >
                        {parishList.map((parish) => (
                          <MenuItem
                            key={parish.id}
                            value={parish.id}
                          >
                            {parish.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        defaultValue={formik.values.turnId}
                        fullWidth
                        label="Turno"
                        name="turnId"
                        select
                        onChange={formik.handleChange}
                      >
                        {turnList.filter(turn => {
                          const marketId = parishList.find(parish => parish.id === formik.values.parishId)?.marketId;

                          if (turn.marketId === marketId) return turn;
                        })?.map((turn) => (
                          <MenuItem
                            key={turn.id}
                            value={turn.id}
                          >
                            {turn.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
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
              <NextLink href="/dashboard/beneficiaries" passHref legacyBehavior>
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
        )
      }
    </>
  );
};
