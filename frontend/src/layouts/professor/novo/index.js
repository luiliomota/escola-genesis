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
import {Autocomplete, TextField} from "@mui/material";

function Tables() {

    const [tratamento, setTratamento] = useState({
        titulo: "",
        descricao: "",
        nomePaciente: "",
        idPaciente: 0,
    });
    const [listaPacientes, setListaPacientes] = useState([]);

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    useEffect(() => {
        api.get("/api/paciente")
            .then((response) => {
                setListaPacientes(response.data.content);
            })
            .catch((error) => console.error(error))
    }, []);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sucesso!"
            content="Tratamento salvo com sucesso."
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
        api.post("/api/tratamento", tratamento)
            .then((res) => {
                console.table(res);
                if (res.status == 201) {
                    openSuccessSB();
                }
            }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
    }

    function resetForm() {
        setTratamento({
            nome: "",
            dataNascimento: "",
            sexo: "",
            naturalidade: 0,
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
                                <MDTypography variant="h6" color="white">
                                    Novo
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3} pb={3}>
                                <Grid container justifyContent='center' spacing={1}>
                                    <Grid item xs={12} md={6}>
                                        <MDBox component="form" role="form">
                                            <MDBox mb={2}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Titulo"
                                                    value={tratamento.nome}
                                                    onChange={(e) => setTratamento({
                                                        ...tratamento,
                                                        nome: e.target.value
                                                    })}/>
                                            </MDBox>
                                            <MDBox mb={2}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    multiline rows={5}
                                                    label="Descrição"
                                                    value={tratamento.descricao}
                                                    onChange={(e) => setTratamento({
                                                        ...tratamento,
                                                        dataNascimento: e.target.value
                                                    })}/>
                                            </MDBox>
                                            <MDBox mb={2}>
                                                <Autocomplete
                                                    options={listaPacientes}
                                                    getOptionLabel={(option) => option ? option.nome : ""}
                                                    value={listaPacientes.find((item) => item.idPaciente === tratamento.idPaciente)}
                                                    isOptionEqualToValue={(option, value) => option ? value : ""}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            setTratamento({...tratamento, naturalidade: value.id})
                                                        } else {
                                                            setTratamento({...tratamento, naturalidade: 0});
                                                        }
                                                    }}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            label="Digite o nome"/>}
                                                />
                                            </MDBox>
                                        </MDBox>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='center' spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MDButton
                                            fullWidth
                                            variant="gradient"
                                            color="dark"
                                            onClick={handleSubmit}>
                                            Salvar
                                        </MDButton>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDButton
                                            fullWidth
                                            color="error"
                                            variant="outlined"
                                            onClick={resetForm}>
                                            Limpar
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
