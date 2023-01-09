/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useEffect, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import api from "api";
import {Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import InputMask from "react-input-mask";
import {useParams} from "react-router-dom";

function Tables() {

    const { id } = useParams();

    const [disciplina, setDisciplina] = useState({
        id: "",
        nome: "",
    });

    const [listaDisciplinas, setListaDisciplinas] = useState([]);

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    useEffect(() => {
        api.get(`/api/disciplina/${id}`)
            .then((response) => {
                if(response.status == 200 && disciplina.id === undefined) {
                    setDisciplina(response.data);
                }
            })
            .catch((error) => console.error(error));
    });

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sucesso!"
            content="Disciplina salva com sucesso."
            dateTime=""
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );

    const renderErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Erro"
            content="Por favor, entre em contato com o suporte."
            dateTime=""
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );
    function handleSubmit() {
        api.put((`/api/disciplina/${id}`), disciplina)
            .then((res) => {
                console.table(res);
                if (res.status === 200) {
                    openSuccessSB();
                    // resetForm();
                }
            }).catch((error) => {
            openErrorSB();
            console.error(error);
            });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={6} pb={3}>
                {renderSuccessSB}
                {renderErrorSB}
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
                                <MDTypography textTransform="uppercase" variant="h6" color="white">
                                    Modificar Disciplina
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3} pb={3}>
                                <Grid container justifyContent='inherit' spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Nome da disciplina
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                label="Nome"
                                                type="text"
                                                value={disciplina.nome}
                                                onChange={(e) => setDisciplina({...disciplina, nome: e.target.value
                                                })}
                                        />
                                        </MDBox>
                                    </Grid>
                                </Grid>

                                <Grid mt={6} container justifyContent='inherit' spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MDButton
                                            fullWidth
                                            variant="gradient"
                                            color="dark"
                                            onClick={handleSubmit}>
                                            Salvar
                                        </MDButton>
                                    </Grid>
                                </Grid>
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


