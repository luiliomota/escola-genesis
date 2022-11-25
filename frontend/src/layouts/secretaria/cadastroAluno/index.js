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

    const [pai, setPai] = useState({
        nome: "",
        telefone: "",
        profissao: "",
        localTrabalho: "",
        telefoneTrabalho: "",
    });
    const [mae, setMae] = useState({
        nome: "",
        telefone: "",
        profissao: "",
        localTrabalho: "",
        telefoneTrabalho: "",
    });
    const [aluno, setAluno] = useState({
        nome: "",
        dataNascimento: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
        dataMatricula: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
        idade: "",
        sexo: "",
        naturalidade: "",
        nacionalidade: "",
        cuidadoEspecial: "",
        especificacao: "",
        cep: "",
        logradouro: "",
        cidade: "",
        listaEstado: "",
        pais: "",
        anoLetivo: "",
        anoInicial: "",
        situacao: "",
        serie: "",
        turma: "",
        turno: "",
        idPai: 0,
        idMae: 0,
        contatoEmergencia1: "",
        contatoEmergencia2: "",
        observacao: "",
    });
    const [listaAlunos, setListaAlunos] = useState([]);
    const [listaResponsaveis, setListaResponsaveis] = useState([]);
    const [listaEstado, setListaEstado] = useState([]);
    const [listaMunicipio, setListaMunicipio] = useState([]);
    const [listaEndereco, setListaEndereco] = useState({
        cep: "",
        logradouro: "",
        localidade: "",
        uf: "",
    });
    const [listaTurno, setListaTurno] = useState([]);

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

    useEffect( () => {
        api.get("/api/responsavel")
            .then((response) => {
                setListaResponsaveis(response.data.content);
        })
            .catch((error) => console.error(error))
    },[]);

    useEffect( () => {
        api.get("/api/turno")
            .then((response) => {
                setListaTurno(response.data.content);
            })
            .catch((error) => console.error(error))
    },[]);

    useEffect( () => {
        api.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
            .then((response) => {
                setListaEstado(response.data);
            })
            .catch((error) => console.error(error))
    },[]);

    function localizaMunicipio (idEstado) {
        api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`)
            .then((response) => {
                setListaMunicipio(response.data);
            })
            .catch((error) => console.error(error))
    }

    function localizaEndereco (cep) {
        api.get(`https://viacep.com.br/ws/${cep}/json`)
            .then((response) => {
                setListaEndereco(response.data);
            })
            .catch((error) => console.error(error))
    }

    function apiPai (id) {
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                setPai(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error(error))
    }

    function apiMae (id) {
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                setMae(response.data);
            })
            .catch((error) => console.error(error))
    }

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
                    resetForm();
                }
            }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
    }

    function resetForm() {
        setAluno({
            nome: "",
            dataNascimento: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
            dataMatricula: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
            idade: "",
            sexo: "",
            naturalidade: "",
            nacionalidade: "",
            cuidadoEspecial: "",
            especificacao: "",
            cep: "",
            logradouro: "",
            cidade: "",
            listaEstado: "",
            pais: "",
            anoLetivo: "",
            anoInicial: "",
            situacao: "",
            serie: "",
            turma: "",
            turno: "",
            idPai: 0,
            idMae: 0,
            contatoEmergencia1: "",
            contatoEmergencia2: "",
            observacao: "",
        });
        setListaEndereco({
            cep: "",
            logradouro: "",
            localidade: "",
            uf: "",
        });
        setPai({
            nome: "",
            telefone: "",
            profissao: "",
            localTrabalho: "",
            telefoneTrabalho: "",
        });
        setMae ({
            nome: "",
            telefone: "",
            profissao: "",
            localTrabalho: "",
            telefoneTrabalho: "",
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
                                    Cadastro Aluno
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
                                        </MDBox>
                                        </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                label="Data de nascimento"
                                                type="date"
                                                value={aluno.dataNascimento}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    dataNascimento: e.target.value
                                                })}/>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                label="Data de matricula"
                                                type="date"
                                                // multiline rows={5}
                                                value={aluno.dataMatricula}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    dataMatricula: e.target.value
                                                })}/>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="999 Anos"
                                                maskChar=' '
                                                value={aluno.idade}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    idade: e.target.value
                                                })}
                                            >
                                                {() =>
                                                    <TextField
                                                        fullWidth
                                                        label="Idade"
                                                        // multiline rows={5}
                                                    />
                                                }
                                            </InputMask>
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
                                       </MDBox>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <MDTypography fontSize={15} color="dark">
                                            Naturalidade
                                        </MDTypography>
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                options={listaEstado}
                                                getOptionLabel={(option) => option ? option.sigla : ""}
                                                isOptionEqualToValue={(option, value) => option ? value : ""}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        localizaMunicipio(value.id);
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Estado"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                options={listaMunicipio}
                                                getOptionLabel={(option) => option ? option.nome : ""}
                                                isOptionEqualToValue={(option, value) => option ? value : ""}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, naturalidade: value.nome});
                                                    } else {
                                                        setAluno({...aluno, naturalidade: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Municipio"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <MDBox mb={4}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Nacionalidade"
                                                value={aluno.nacionalidade}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    nacionalidade: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <MDBox mb={1}>
                                            <FormControl fullWidth>
                                                <FormLabel style={{fontSize:"1rem"}} id="select-simounao-label">Necessita de cuidados especiais?</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="select-simounao-label"
                                                    name="select-simounao-radio-group"
                                                    value={aluno.cuidadoEspecial}
                                                    onChange={(e) => setAluno({...aluno, cuidadoEspecial: e.target.value})}
                                                >
                                                    <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="Não" control={<Radio />} label="Não" />
                                                </RadioGroup>
                                            </FormControl>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <MDBox mb={4}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Especificar"
                                                value={aluno.especificacao}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    especificacao: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="CEP"
                                                value={aluno.cep}
                                                onChange={(e) => {
                                                        setAluno({...aluno, cep: e.target.value});
                                                        localizaEndereco(e.target.value);
                                                    }
                                                }
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Logradouro"
                                                value={listaEndereco.logradouro}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    logradouro: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Cidade"
                                                value={listaEndereco.localidade}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    cidade: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Estado"
                                                value={listaEndereco.uf}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    estado: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="9999"
                                                value={aluno.anoLetivo}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    anoLetivo: e.target.value
                                                })}
                                            >
                                                {() =>
                                                    <TextField
                                                        fullWidth
                                                        label="Ano Letivo"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="9999"
                                                value={aluno.anoInicial}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    anoInicial: e.target.value
                                                })}
                                            >
                                                {() =>
                                                    <TextField
                                                        fullWidth
                                                        label="Ano Inicial"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Situação"
                                                value={aluno.situacao}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    situacao: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Série"
                                                value={aluno.serie}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    serie: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Turma"
                                                value={aluno.turma}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    turma: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                options={listaTurno}
                                                getOptionLabel={(option) => option ? option.nome : ""}
                                                isOptionEqualToValue={(option, value) => option ? value : ""}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, turno: value.nome});
                                                    } else {
                                                        setAluno({...aluno, turno: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Turno"/>}
                                            />
                                        </MDBox>
                                    </Grid>




                                    {/*Filiação*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Filiação
                                        </MDTypography>
                                    </Grid>
                                        {/*Pai*/}
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                options={listaResponsaveis}
                                                getOptionLabel={(option) => option ? option.nome : ""}
                                                isOptionEqualToValue={(option, value) => option ? value : ""}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, idPai: value.id});
                                                        apiPai(value.id);
                                                    } else {
                                                        setAluno({...aluno, idPai: 0});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Nome do pai"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Telefone"
                                                value={pai.telefone}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Profissão"
                                                value={pai.profissao}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Local de trabalho"
                                                value={pai.localTrabalho}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={6}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Contato trabalho"
                                                value={pai.telefoneTrabalho}
                                            />
                                        </MDBox>
                                    </Grid>



                                        {/*Mãe*/}
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                options={listaResponsaveis}
                                                getOptionLabel={(option) => option ? option.nome : ""}
                                                isOptionEqualToValue={(option, value) => option ? value : ""}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, idMae: value.id});
                                                        apiMae(value.id);
                                                    } else {
                                                        setAluno({...aluno, idMae: 0});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Nome da mãe"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                    <MDBox mb={1}>
                                        <MDInput
                                            fullWidth
                                            type="text"
                                            label="Telefone"
                                            value={mae.telefone}
                                        />
                                    </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                                <MDInput
                                                    fullWidth
                                                    type="text"
                                                    label="Profissão"
                                                    value={mae.profissao}
                                                />
                                            </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Local de trabalho"
                                                value={mae.localTrabalho}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Contato trabalho"
                                                value={mae.telefoneTrabalho}
                                            />
                                        </MDBox>
                                    </Grid>

                                    {/*Emerência*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Emergência
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={aluno.contatoEmergencia1}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    contatoEmergencia1: e.target.value
                                                })}
                                            >
                                                {() =>
                                                    <TextField
                                                        fullWidth
                                                        label="Contato telefone 1"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={4}>
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={aluno.contatoEmergencia2}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    contatoEmergencia2: e.target.value
                                                })}
                                            >
                                                {() =>
                                                    <TextField
                                                        fullWidth
                                                        label="Contato telefone 2"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>

                                    {/*Observaçoes*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Observação
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                multiline row={5}
                                                value={aluno.observacao}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    observacao: e.target.value
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
