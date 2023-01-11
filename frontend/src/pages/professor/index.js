/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {useEffect, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "../../components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import tableData from "pages/professor/data";
import api from "../../api";

function Tables() {
    const {columns, rows, filtro, setLista, setListaFiltro} = tableData();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setLista([
            {
                id: 1,
                nome: 'PORTUGUÊS',
                serie: '1º ANO',
                turma: 'A',
                turno: 'Matutino',
                anoLetivo: '2022',
                status: 'CRIADA',
                periodo: [
                    {
                        id: 1,
                        nome: '1º Bimestre',
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
                    },
                    {
                        id: 2,
                        nome: '2º Bimestre'
                    },
                    {
                        id: 3,
                        nome: '3º Bimestre'
                    },
                    {
                        id: 2,
                        nome: '4º Bimestre'
                    }
                ]
            }
        ])
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="dark"
                                borderRadius="lg"
                                coloredShadow="secondary"
                            >
                                <MDTypography variant="h6" color="white">
                                    Professor
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <MDBox px={2}>
                                    <MDInput
                                        fullWidth
                                        type="text"
                                        label="Pesquisar (nome, descrição)"
                                        value={searchText}
                                        onChange={e => {
                                            setSearchText(e.target.value);
                                            filtro(e.target.value);
                                        }
                                        }
                                    />
                                </MDBox>
                                <DataTable
                                    table={{columns, rows}}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={true}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Tables;
