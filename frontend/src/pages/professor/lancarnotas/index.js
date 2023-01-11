/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Tab, Tabs} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Periodo from "./periodo";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Tables() {
    //TODO carregar disciplina da API
    const [disciplina, setDisciplina] = useState({
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
                        nome: 'Fulano de Tal 1',
                        notas: [3,4,5,6],
                        faltas: []
                    },
                    {
                        id: 372,
                        nome: 'Fulano de Tal 2',
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
                id: 4,
                nome: '4º Bimestre'
            }
        ]
    });
    const [tabSelected, setTabSelected] = useState(0);
    const handleChange = (e, newValue) => {
        setTabSelected(newValue);
    };

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
                                    Lanças Notas
                                </MDTypography>
                            </MDBox>
                            <MDBox>
                                <MDBox p={4}>
                                    <Grid container justifyContent='inherit' spacing={2}>
                                        <Grid item xs={12} md={2}>
                                            <MDTypography fontWeight="bold">Ano Letivo: {disciplina.anoLetivo}</MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MDTypography>Disciplina: {disciplina.nome}</MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MDTypography>
                                                Ano: {disciplina.serie}&nbsp;&nbsp;
                                                Turma: {disciplina.turma}&nbsp;&nbsp;
                                                Turno: {disciplina.turno}
                                            </MDTypography>
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox px={2}>
                                    <MDBox>
                                        <Tabs value={tabSelected} onChange={handleChange} aria-label="basic tabs example">
                                            {
                                                disciplina.periodo.map((item, index) =>
                                                    <Tab key={index} label={item.nome} {...a11yProps(index)} />
                                                )
                                            }
                                        </Tabs>
                                    </MDBox>
                                    {
                                        disciplina.periodo.map((tab, index) =>
                                            <Periodo
                                                key={index}
                                                value={tabSelected}
                                                index={index}
                                                idPeriodo={tab.id}>
                                            </Periodo>
                                        )
                                    }
                                </MDBox>
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
