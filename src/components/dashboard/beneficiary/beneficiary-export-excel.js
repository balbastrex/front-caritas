import {Button} from '@mui/material';
import * as XLSX from 'sheetjs-style';
import {Plus as PlusIcon} from '../../../icons/plus';

export const exportBeneficiariesToExcel = (beneficiaries) => {

    const worksheet = XLSX.utils.json_to_sheet(beneficiaries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

    /* fix headers */
    // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

    /* calculate column width */
    // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    // worksheet["!cols"] = [ { wch: max_width } ];

    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, "Beneficiarios.xlsx", { compression: true });
}
