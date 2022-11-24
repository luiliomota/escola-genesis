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

function Tables() {

    const [aluno, setAluno] = useState({
        nome: "",
        dataNascimento: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
        sexo: "",
        naturalidade: "",
    });
    const [listaAlunos, setListaAlunos] = useState([]);

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    useEffect(() => {
        api.get("/api/aluno")
            .then((response) => {
                setListaAlunos(response.data.content);
            })
            .catch((error) => console.error(error))
    }, []);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sucesso!"
            content="Aluno salvo com sucesso."
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
        api.post("/api/aluno", aluno)
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
        setAluno({
            nome: "",
            sexo: "",
            naturalidade: "",
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
                                    Matrícula/Rematrícula
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3} pb={3}>
                                <Grid container justifyContent='inherit' spacing={1}>
                                        {/*Identificação*/}
                                        <Grid item xs={12} md={12}>
                                            <MDTypography mb={1} variant="h6" color="dark">
                                                Identificação do(a) aluno(a)
                                            </MDTypography>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    label="Nome"
                                                    type="text"
                                                    // multiline rows={5}
                                                    value={aluno.nome}
                                                    onChange={(e) => setAluno({
                                                        ...aluno,
                                                        nome: e.target.value
                                                    })}
                                                />

                                                {/*<Autocomplete*/}
                                                {/*    options={listaAlunos}*/}
                                                {/*    getOptionLabel={(option) => option ? option.nome : ""}*/}
                                                {/*    value={listaAlunos.find((item) => item.nome === aluno.nome)}*/}
                                                {/*    isOptionEqualToValue={(option, value) => option ? value : ""}*/}
                                                {/*    onChange={(e, value) => {*/}
                                                {/*        if (value) {*/}
                                                {/*            setAluno({...aluno, nome: value.nome})*/}
                                                {/*        } else {*/}
                                                {/*            setAluno({...aluno, nome: ""});*/}
                                                {/*        } console.log(aluno)*/}
                                                {/*    }}*/}
                                                {/*    renderInput={(params) =>*/}
                                                {/*        <TextField*/}
                                                {/*            {...params}*/}
                                                {/*            label="Nome"/>}*/}
                                                {/*/>*/}
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    label="Data de nascimento"
                                                    type="date"
                                                    // multiline rows={5}
                                                    value={aluno.dataNascimento}
                                                    onChange={(e) => setAluno({
                                                        ...aluno,
                                                        dataNascimento: e.target.value
                                                    })}/>
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
                                                        value={aluno.sexo}
                                                        onChange={(e) => setAluno({...aluno, sexo: e.target.value})}
                                                    >
                                                        <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                                        <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                                                    </RadioGroup>
                                                </FormControl>

                                                {/*<MDInput*/}
                                                {/*    fullWidth*/}
                                                {/*    type="text"*/}
                                                {/*    label="Sexo"*/}
                                                {/*    value={aluno.sexo}*/}
                                                {/*    onChange={(e) => setAluno({*/}
                                                {/*        ...aluno,*/}
                                                {/*        sexo: e.target.value*/}
                                                {/*    })}/>*/}
                                           </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={4}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Naturalidade"
                                                value={aluno.naturalidade}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    naturalidade: e.target.value
                                                })}/>
                                        </MDBox>
                                        </Grid>

                                        {/*Filiação*/}
                                        <Grid item xs={12} md={12}>
                                            <MDTypography variant="h6" color="dark">
                                                Filiação
                                            </MDTypography>
                                        </Grid>
                                            {/*Pai*/}
                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Nome Pai"
                                                // value={aluno.titulo}
                                                // onChange={(e) => setAluno({
                                                //     ...aluno,
                                                //     titulo: e.target.value
                                                // })}
                                            />
                                        </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Telefone"
                                                // value={aluno.titulo}
                                                // onChange={(e) => setAluno({
                                                //     ...aluno,
                                                //     titulo: e.target.value
                                                // })}
                                            />
                                        </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Profissão"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Endereço residencial"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Local de trabalho"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={6}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Contato trabalho"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                            {/*Mãe*/}
                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Nome Mãe"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Telefone"
                                                // value={aluno.titulo}
                                                // onChange={(e) => setAluno({
                                                //     ...aluno,
                                                //     titulo: e.target.value
                                                // })}
                                            />
                                        </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                                    <MDInput
                                                        fullWidth
                                                        type="text"
                                                        label="Profissão"
                                                        // value={aluno.titulo}
                                                        // onChange={(e) => setAluno({
                                                        //     ...aluno,
                                                        //     titulo: e.target.value
                                                        // })}
                                                    />
                                                </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Endereço residencial"
                                                // value={aluno.titulo}
                                                // onChange={(e) => setAluno({
                                                //     ...aluno,
                                                //     titulo: e.target.value
                                                // })}
                                            />
                                        </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Local de trabalho"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDBox mb={4}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Contato trabalho"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>

                                        {/*Situação escolar*/}
                                        <Grid item xs={12} md={12}>
                                            <MDTypography variant="h6" color="dark">
                                                Situação Escolar
                                            </MDTypography>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={4}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Descrição"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>

                                        {/*Outras informações*/}
                                        <Grid item xs={12} md={12}>
                                            <MDTypography variant="h6" color="dark">
                                                Outras Informações
                                            </MDTypography>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Turno"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MDTypography fontSize={15} color="dark">
                                                Necessita de cuidados especiais?
                                            </MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Sim/Não"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <MDBox mb={4}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Especificar"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
                                                />
                                            </MDBox>
                                        </Grid>

                                        {/*Observaçoes*/}
                                        <Grid item xs={12} md={12}>
                                            <MDTypography variant="h6" color="dark">
                                                Observaçoes
                                            </MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    multiline row={10}
                                                    // label="Observaçoes"
                                                    // value={aluno.titulo}
                                                    // onChange={(e) => setAluno({
                                                    //     ...aluno,
                                                    //     titulo: e.target.value
                                                    // })}
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
