/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import InputMask from "react-input-mask";
import api from "api";

function Tables() {

    const { id } = useParams();

    const [responsavel, setResponsavel] = useState({
        dataCadastro: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
        nome: "",
        telefone: "",
        sexo: "",
        profissao: "",
        email: "",
        localTrabalho: "",
        telefoneTrabalho: "",
        cpf: "",
        rg: "",
        estadoCivil: "",
        nacionalidade: "",
    });

    const [listaEstadoCivil, setListaEstadoCivil] = useState([]);
    const [listaNacionalidade, setListaNacionalidade] = useState([]);
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    useEffect(() => {
        api.get("api/estadocivil")
            .then((response) => {
                setListaEstadoCivil(response.data.content);
            })
            .catch((error) => console.error(error))
    },[]);

    useEffect( () => {
        api.get("/api/nacionalidade")
            .then((response) => {
                setListaNacionalidade(response.data.content);
            })
            .catch((error) => console.error(error))
    },[]);

    useEffect(() => {
        let isSubscribed = true;
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                if (isSubscribed) {
                    setResponsavel(response.data);
                }
            })
            .catch((error) => console.error(error));

        return () => (isSubscribed = false);
    }, []);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sucesso!"
            content="responsavel salvo com sucesso."
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
        api.put(`/api/responsavel/${id}`, responsavel)
            .then((res) => {
                console.table(res);
                if (res.status === 204) {
                    openSuccessSB();
                }
            }).catch((error) => {
                openErrorSB();
                console.error(error)
            });
    }

    function resetForm() {
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
                                    Cadastro Pai/Mãe/Responsável
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3} pb={3}>
                                <Grid container justifyContent='inherit' spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <MDTypography mb={1} variant="h6" color="dark">
                                            Identificação
                                        </MDTypography>
                                    </Grid>

                                    <Grid item xs={12} md={5}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                label="Nome"
                                                type="text"
                                                // multiline rows={5}
                                                value={responsavel.nome}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    nome: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={responsavel.telefone}
                                                onChange={(e) => setResponsavel({
                                                ...responsavel,
                                                telefone: e.target.value
                                                })}
                                                >
                                                {() =>
                                                    <TextField
                                                        fullWidth
                                                        InputLabelProps={{shrink:true}}
                                                        label="Telefone"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="999.999.999-99"
                                                value={responsavel.cpf}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    cpf: e.target.value
                                                })}
                                            >
                                                { () =>
                                                    <TextField
                                                        fullWidth
                                                        InputLabelProps={{shrink:true}}
                                                        label="CPF"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="RG"
                                                value={responsavel.rg}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    rg: e.target.value
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
                                                        value={responsavel.sexo}
                                                        onChange={(e) => setResponsavel({...responsavel, sexo: e.target.value})}
                                                    >
                                                        <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                                        <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                                                    </RadioGroup>
                                                </FormControl>
                                           </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="email"
                                                label="Email"
                                                value={responsavel.email}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    email: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                value={responsavel.estadoCivil}
                                                options={listaEstadoCivil}
                                                getOptionLabel={(option) => {
                                                    const estadoCivil = listaEstadoCivil.find(item => item.nome === option);
                                                    return option ? (estadoCivil ? estadoCivil.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setResponsavel({...responsavel, estadoCivil: value.nome});
                                                    } else {
                                                        setResponsavel({...responsavel, estadoCivil: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Estado Civil"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={responsavel.nacionalidade}
                                                options={listaNacionalidade}
                                                getOptionLabel={(option) => {
                                                    const nacionalidade = listaNacionalidade.find(item => item.nome === option);
                                                    return option ? (nacionalidade ? nacionalidade.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setResponsavel({...responsavel, nacionalidade: value.nome});
                                                    } else {
                                                        setResponsavel({...responsavel, nacionalidade: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Nacionalidade"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Profissão"
                                                value={responsavel.profissao}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    profissao: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Local de trabalho"
                                                value={responsavel.localTrabalho}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    localTrabalho: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={responsavel.telefoneTrabalho}
                                                onChange={(e) => setResponsavel({
                                                    ...responsavel,
                                                    telefoneTrabalho: e.target.value
                                                })}
                                                >
                                                { () =>
                                                    <TextField
                                                    fullWidth
                                                    InputLabelProps={{shrink:true}}
                                                    label="Telefone Trabalho"
                                                    />
                                                }
                                            </InputMask>
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
                                    {/*<Grid item xs={12} md={3}>*/}
                                    {/*    <MDButton*/}
                                    {/*        fullWidth*/}
                                    {/*        color="error"*/}
                                    {/*        variant="outlined"*/}
                                    {/*        onClick={resetForm}>*/}
                                    {/*        Excluir*/}
                                    {/*    </MDButton>*/}
                                    {/*</Grid>*/}
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
