import {useState} from "react";

import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";
import tableData from "./data";

export default function Index(props) {
    const { children, value, index, idPeriodo, ...other } = props;
    const {columns, rows, filtro, setLista, setListaFiltro} = tableData(idPeriodo);

    //TODO carregar período/bimestre da API
    const [periodo, setPeriodo] = useState({
        id: 1,
        nome: '1º Index',
        alunos: [
            {
                id: 371,
                notas: [3,4,5,6],
                faltas: []
            },
            {
                id: 372,
                notas: [5,1,8,8],
                faltas: []
            }
        ]
    });

    function handleSubmit() {
        //TODO salvar dados na API
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <MDBox sx={{ p: 3 }}>
                    <MDTypography>{children}</MDTypography>
                    <MDBox>
                        <Grid container justifyContent='right' spacing={2}>
                            <Grid item xs={12} md={3}>
                                <MDButton
                                    fullWidth
                                    variant="gradient"
                                    color="success"
                                    onClick={handleSubmit}>
                                    Salvar Tudo
                                </MDButton>
                            </Grid>
                        </Grid>
                    </MDBox>
                    <DataTable
                        table={{columns, rows}}
                        isSorted={true}
                        entriesPerPage={{
                            defaultValue: 50,
                            entries: [25,50]
                        }}
                        showTotalEntries={true}
                        noEndBorder
                    />
                </MDBox>
            )}
        </div>
    );
}