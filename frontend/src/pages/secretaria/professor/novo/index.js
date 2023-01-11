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

function Tables() {

    const [professor, setProfessor] = useState({
        nome: "",
        sexo: "",
        dataCadastro: "",
    });
    const [listaProfessors, setListaProfessors] = useState([]);

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    useEffect(() => {
        api.get("/api/professor?size=2000")
            .then((response) => {
                setListaProfessors(response.data.content);
            })
            .catch((error) => console.error(error))
    }, []);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sucesso!"
            content="Professor salvo com sucesso."
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
        api.post("/api/professor", professor)
            .then((res) => {
                console.table(res);
                if (res.status == 201) {
                    openSuccessSB();
                    resetForm();
                }
            }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
    }

    function resetForm() {
        setProfessor({
            nome: "",
            sexo: "",
            dataCadastro: "",
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
                                    Cadastro Professor(a)
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3} pb={3}>
                                <Grid container justifyContent='inherit' spacing={1}>
                                    {/*Identificação*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Nome do professor
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                label="Nome"
                                                type="text"
                                                // multiline rows={5}
                                                value={professor.nome}
                                                onChange={(e) => setProfessor({
                                                    ...professor,
                                                    nome: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <MDBox mb={1}>
                                            <FormControl fullWidth>
                                                <FormLabel style={{fontSize:"1rem"}} id="select-sexo-label">Sexo</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="select-sexo-label"
                                                    name="select-sexo-radio-group"
                                                    value={professor.sexo}
                                                    onChange={(e) => setProfessor({...professor, sexo: e.target.value})}
                                                >
                                                    <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                                    <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                                                </RadioGroup>
                                            </FormControl>
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
