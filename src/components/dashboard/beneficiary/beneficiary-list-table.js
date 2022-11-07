import {format} from 'date-fns';
import NextLink from 'next/link';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent, Checkbox,
  Divider, FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import {updateBeneficiary} from '../../../slices/beneficiary';
import {useDispatch} from '../../../store';
import { Scrollbar } from '../../scrollbar';

const genderType = [
  {
    value: 'Mujer'
  },
  {
    value: 'Hombre'
  }
];

const MAX_UNIT__NUMBER = 11;

export const BeneficiaryListTable = (props) => {
  const {
    countries,
    familyTypes,
    citizenTypes,
    civilStateTypes,
    employmentTypes,
    guardianshipTypes,
    educationTypes,
    authorizationTypes,
    parishes,
    turns,
    onPageChange,
    onRowsPerPageChange,
    page,
    beneficiaries,
    beneficiariesCount,
    rowsPerPage,
    ...other
  } = props;
  const dispatch = useDispatch();
  const [openBeneficiary, setOpenBeneficiary] = useState(null);
  const [editBeneficiary, setEditBeneficiary] = useState(null);

  const handleOpenBeneficiary = (beneficiaryId) => {
    setOpenBeneficiary((prevValue) => (prevValue === beneficiaryId ? null : beneficiaryId));
    setEditBeneficiary(beneficiaries.find(beneficiary => beneficiary.id === beneficiaryId))
  };

  const handleUpdateBeneficiary = async () => {
    setOpenBeneficiary(null);

    dispatch(updateBeneficiary(editBeneficiary));

    toast.success('Beneficiario actualizado.');
  };

  const handleCancelEdit = () => {
    setOpenBeneficiary(null);
  };

  const handleDeleteBeneficiary = () => {
    toast.error('Un beneficiario no puede ser borrado.');
  };

  const onChangeBeneficiary = (field, value) => {
    setEditBeneficiary({
      ...editBeneficiary,
      [field]: value
    });
  }

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                Carnet
              </TableCell>
              <TableCell width="25%">
                Nombre
              </TableCell>
              <TableCell>
                Caducidad
              </TableCell>
              <TableCell>
                Presupuesto
              </TableCell>
              <TableCell>
                U.F.
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beneficiaries.map((beneficiary) => {
              const open = beneficiary.id === openBeneficiary;

              return (
                <Fragment key={beneficiary.id}>
                  <TableRow
                    hover
                    key={beneficiary.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        })
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handleOpenBeneficiary(beneficiary.id)}>
                        {open
                          ? <ChevronDownIcon fontSize="small" />
                          : <><Typography variant="subtitle2">Editar</Typography><ChevronRightIcon fontSize="small" /></>}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {beneficiary.license}
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Box sx={{ ml: 0}}>
                          <Typography variant="subtitle1">
                            {`${beneficiary.name} ${beneficiary.lastname1} ${beneficiary.lastname2}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {format(new Date(beneficiary.expires), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {beneficiary.expires}
                    </TableCell>
                    <TableCell>
                      {beneficiary.familyUnit}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/beneficiaries/${beneficiary.id}`}
                        passHref
                      >
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Datos Personales
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.cif}
                                    fullWidth
                                    label="DNI"
                                    name="cif"
                                    onChange={(event) => onChangeBeneficiary('cif', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.name}
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    onChange={(event) => onChangeBeneficiary('name', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.lastname1}
                                    fullWidth
                                    label="Apellido 1"
                                    name="lastname1"
                                    onChange={(event) => onChangeBeneficiary('lastname1', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.lastname2}
                                    fullWidth
                                    label="Apellido 2"
                                    name="lastname2"
                                    onChange={(event) => onChangeBeneficiary('lastname2', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.nationalityId}
                                    fullWidth
                                    label="Nacionalidad"
                                    select
                                    onChange={(event) => onChangeBeneficiary('nationalityId', event.target.value)}
                                  >
                                    {countries.map((country) => (
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
                                    defaultValue={beneficiary.gender}
                                    fullWidth
                                    label="Sexo"
                                    select
                                    onChange={(event) => onChangeBeneficiary('gender', event.target.value)}
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
                                  <TextField
                                    defaultValue={beneficiary.birthdate}
                                    fullWidth
                                    label="F.Nacimiento (dd/mm/yyyy)"
                                    name="birthdate"
                                    onChange={(event) => onChangeBeneficiary('birthdate', event.target.value)}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                SICE
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                item
                                md={6}
                                xs={12}
                              >
                                <TextField
                                  defaultValue={beneficiary.sice}
                                  fullWidth
                                  label="Sice"
                                  name="sice"
                                  onChange={(event) => onChangeBeneficiary('sice', event.target.value)}
                                />
                              </Grid>
                              <Grid
                                item
                                md={12}
                                xs={12}
                                mt={2}
                              >
                                <Typography variant="h6">
                                  Datos de contacto
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Grid
                                  container
                                  spacing={3}
                                >
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={beneficiary.address}
                                      fullWidth
                                      label="Dirección"
                                      name="address"
                                      onChange={(event) => onChangeBeneficiary('address', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={beneficiary.state}
                                      fullWidth
                                      label="Provincia"
                                      name="state"
                                      onChange={(event) => onChangeBeneficiary('state', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={beneficiary.city}
                                      fullWidth
                                      label="Localidad"
                                      name="city"
                                      onChange={(event) => onChangeBeneficiary('city', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={beneficiary.zip}
                                      fullWidth
                                      label="Código postal"
                                      name="zip"
                                      onChange={(event) => onChangeBeneficiary('zip', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={beneficiary.email}
                                      fullWidth
                                      label="Email"
                                      name="email"
                                      onChange={(event) => onChangeBeneficiary('email', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={beneficiary.phone}
                                      fullWidth
                                      label="Teléfono"
                                      name="phone"
                                      onChange={(event) => onChangeBeneficiary('phone', event.target.value)}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Situación 1
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label={(
                                      <Typography variant="body1">
                                        Libertad
                                      </Typography>
                                    )}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label={(
                                      <Typography variant="body1">
                                        Sin Techo
                                      </Typography>
                                    )}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.familyTypeId}
                                    fullWidth
                                    label="Tipo Familia"
                                    select
                                    onChange={(event) => onChangeBeneficiary('familyTypeId', event.target.value)}
                                  >
                                    {familyTypes.map((gender) => (
                                      <MenuItem
                                        key={gender.id}
                                        value={gender.id}
                                      >
                                        {gender.name}
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
                                    defaultValue={beneficiary.adults}
                                    fullWidth
                                    label="Adultos"
                                    select
                                    onChange={(event) => onChangeBeneficiary('adults', event.target.value)}
                                  >
                                    {Array.from({ length: MAX_UNIT__NUMBER }).map((_, idx) => (
                                      <MenuItem
                                        key={idx}
                                        value={idx}
                                      >
                                        {idx}
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
                                    defaultValue={beneficiary.minors}
                                    fullWidth
                                    label="Menores"
                                    select
                                    onChange={(event) => onChangeBeneficiary('minors', event.target.value)}
                                  >
                                    {Array.from({ length: MAX_UNIT__NUMBER }).map((_, idx) => (
                                      <MenuItem
                                        key={idx}
                                        value={idx}
                                      >
                                        {idx}
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
                                    defaultValue={beneficiary.childrenUnder18}
                                    fullWidth
                                    label="Menores de 2 años"
                                    select
                                    onChange={(event) => onChangeBeneficiary('childrenUnder18', event.target.value)}
                                  >
                                    {Array.from({ length: MAX_UNIT__NUMBER }).map((_, idx) => (
                                      <MenuItem
                                        key={idx}
                                        value={idx}
                                      >
                                        {idx}
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
                                    defaultValue={beneficiary.childrenOver18}
                                    fullWidth
                                    label="Mayores de dos años"
                                    select
                                    onChange={(event) => onChangeBeneficiary('childrenOver18', event.target.value)}
                                  >
                                    {Array.from({ length: MAX_UNIT__NUMBER }).map((_, idx) => (
                                      <MenuItem
                                        key={idx}
                                        value={idx}
                                      >
                                        {idx}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.gratuitous}
                                    fullWidth
                                    label="Gratuito (%)"
                                    name="gratuitous"
                                    onChange={(event) => onChangeBeneficiary('gratuitous', event.target.value)}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Situación 2
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.citizenTypeId}
                                    fullWidth
                                    label="Ciudadania"
                                    select
                                    onChange={(event) => onChangeBeneficiary('citizenTypeId', event.target.value)}
                                  >
                                    {citizenTypes.map((citizen) => (
                                      <MenuItem
                                        key={citizen.id}
                                        value={citizen.id}
                                      >
                                        {citizen.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.civilStateTypeId}
                                    fullWidth
                                    label="Estado civil"
                                    select
                                    onChange={(event) => onChangeBeneficiary('civilStateTypeId', event.target.value)}
                                  >
                                    {civilStateTypes.map((civilState) => (
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
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.employmentTypeId}
                                    fullWidth
                                    label="Situación laboral"
                                    select
                                    onChange={(event) => onChangeBeneficiary('employmentTypeId', event.target.value)}
                                  >
                                    {employmentTypes.map((employment) => (
                                      <MenuItem
                                        key={employment.id}
                                        value={employment.id}
                                      >
                                        {employment.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.guardianshipTypeId}
                                    fullWidth
                                    label="Custodia"
                                    select
                                    onChange={(event) => onChangeBeneficiary('guardianshipTypeId', event.target.value)}
                                  >
                                    {guardianshipTypes.map((guardianship) => (
                                      <MenuItem
                                        key={guardianship.id}
                                        value={guardianship.id}
                                      >
                                        {guardianship.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.educationTypeId}
                                    fullWidth
                                    label="Nivel de estudios"
                                    select
                                    onChange={(event) => onChangeBeneficiary('educationTypeId', event.target.value)}
                                  >
                                    {educationTypes.map((education) => (
                                      <MenuItem
                                        key={education.id}
                                        value={education.id}
                                      >
                                        {education.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.authorizationTypeId}
                                    fullWidth
                                    label="Autorización"
                                    select
                                    onChange={(event) => onChangeBeneficiary('authorizationTypeId', event.target.value)}
                                  >
                                    {authorizationTypes.map((education) => (
                                      <MenuItem
                                        key={education.id}
                                        value={education.id}
                                      >
                                        {education.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>


                              </Grid>
                            </Grid>

                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Parroquia
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={beneficiary.parishId}
                                    fullWidth
                                    label="Parroquia asociada"
                                    select
                                    onChange={(event) => onChangeBeneficiary('parishId', event.target.value)}
                                  >
                                    {parishes.map((parish) => (
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
                                    defaultValue={beneficiary.turnId}
                                    fullWidth
                                    label="Turno"
                                    select
                                    onChange={(event) => onChangeBeneficiary('turnId', event.target.value)}
                                  >
                                    {turns.filter(turn => {
                                      const marketId = parishes.find(parish => parish.id === editBeneficiary.parishId).marketId;
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

                          </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            px: 2,
                            py: 1
                          }}
                        >
                          <Button
                            onClick={() => handleUpdateBeneficiary(beneficiary)}
                            sx={{ m: 1 }}
                            type="submit"
                            variant="contained"
                          >
                            Actualizar
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            sx={{ m: 1 }}
                            variant="outlined"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleDeleteBeneficiary}
                            color="error"
                            sx={{
                              m: 1,
                              ml: 'auto'
                            }}
                          >
                            Borrar Beneficiario
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={beneficiariesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

BeneficiaryListTable.propTypes = {
  citizenType: PropTypes.array,
  civilStateTypes: PropTypes.array,
  employmentTypes: PropTypes.array,
  guardianshipTypes: PropTypes.array,
  educationTypes: PropTypes.array,
  authorizationTypes: PropTypes.array,
  parishes: PropTypes.array,
  turns: PropTypes.array,
  beneficiaries: PropTypes.array.isRequired,
  beneficiariesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
