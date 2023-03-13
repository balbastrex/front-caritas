import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tooltip} from '@mui/material';
import {format} from 'date-fns';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Fragment} from 'react';
import {Trash as TrashIcon} from '../../../icons/trash';
import {Scrollbar} from '../../scrollbar';

export const BeneficiaryNotesTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    beneficiaryId,
    notes,
    notesCount,
    rowsPerPage,
    handleRemoveNote,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                Fecha
              </TableCell>
              <TableCell width="25%">
                Descripción
              </TableCell>
              <TableCell align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => {
              return (
                <Fragment key={note.id}>
                  <TableRow
                    hover
                    key={note.id}
                  >
                    <TableCell
                      padding="checkbox"
                      width="25%"
                    >
                    </TableCell>
                    <TableCell>
                      {format(new Date(note.created), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {note.description}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/beneficiaries/${beneficiaryId}/notes/${note.id}`}
                        passHref
                        legacyBehavior>
                        <Tooltip title="Editar">
                          <IconButton component="a">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </NextLink>
                      <Tooltip title="Borrar">
                        <IconButton
                          component="a"
                          onClick={() => handleRemoveNote(note.id)}
                        >
                          <TrashIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={notesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

BeneficiaryNotesTable.propTypes = {
  notes: PropTypes.array.isRequired,
  notesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
