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

    const [aluno, setAluno] = useState({
        id: "",
        nome: "",
        dataNascimento: "",
        dataMatricula: "",
        sexo: "",
        naturalidadeCidade: "",
        naturalidadeEstado: "",
        nacionalidade: "",
        cuidadoEspecial: "",
        especificacao: "",
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
        anoLetivo: '',
        anoInicial: "",
        situacao: "",
        statusMatricula: "",
        turma: "",
        turno: "",
        idPai: "",
        idMae: "",
        idResponsavel: "",
        idResponsavelContrato: "",
        dataContrato: "",
        contatoEmergencia1: "",
        contatoEmergencia2: "",
        nomeEmergencia1: "",
        nomeEmergencia2: "",
        observacao: "",
    });

    const [idade, setIdade] = useState();
    const [uf, setUf] = useState([]);
    const[listaContatoEmergencia, setListaContatoEmergencia] = useState([
        {nome:"Pai"},
        {nome:"Mãe"},
        {nome:"Irmão/Irmã"},
        {nome:"Tio/Tia"},
        {nome:"Avô/Avó"},
        {nome:"Padrasto"},
        {nome:"Madrasta"}
    ]);

    const [pai, setPai] = useState({
        nome: "",
    });

    const [mae, setMae] = useState({
        nome: "",
    });

    const [responsavel, setResponsavel] = useState({
        nome: "",
    });

    const [responsavelContrato, setResponsavelContrato] = useState({
        nome: "",
    });

    const [listaAlunos, setListaAlunos] = useState([]);
    const [listaResponsaveis, setListaResponsaveis] = useState([]);
    const [listaResponsaveisContrato, setListaResponsaveisContrato] = useState([]);
    const [listaEstado, setListaEstado] = useState([]);
    const [listaMunicipio, setListaMunicipio] = useState([{
            nome: "",
        }]);
    const [listaEndereco, setListaEndereco] = useState({
        cep: "",
    });
    const [listaTurno, setListaTurno] = useState([]);
    const [listaTurma, setListaTurma] = useState([]);
    const [listaNacionalidade, setListaNacionalidade] = useState([]);
    const [listaSituacao, setListaSituacao] = useState([]);
    const [listaAnoInicial, setListaAnoInicial] = useState([]);

    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    useEffect( () => {
        api.get("/api/unidadeFederativaIbge?size=27")
            .then((response) => {
                setListaEstado(response.data.content);
            })
            .catch((error) => console.error(error))
    },[]);

    useEffect( () => {
        api.get("/api/responsavel?size=1500")
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
        api.get("/api/turma")
            .then((response) => {
                setListaTurma(response.data.content);
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

    useEffect( () => {
        api.get("/api/situacao")
            .then((response) => {
                setListaSituacao(response.data.content);
            })
            .catch((error) => console.error(error))
    },[]);

    useEffect( () => {
        api.get("/api/anoinicial")
            .then((response) => {
                setListaAnoInicial(response.data.content);
            })
            .catch((error) => console.error(error))
    },[]);

    useEffect(() => {
        api.get(`/api/aluno/${id}`)
            .then((response) => {
                if(response.status == 200 && aluno.dataCadastro === undefined) {
                    api.get(`/api/municipiosIbge/porEstado/${response.data.naturalidadeEstado}/?size=1000`)
                        .then((resp) => {
                            setListaMunicipio(resp.data.content);
                        })
                        .catch((error) => console.error(error));
                    setAluno(response.data);
                    apiPai(listaResponsaveis.find(item => item.nome === response.data.nomePai).id);
                    apiMae(listaResponsaveis.find(item => item.nome === response.data.nomeMae).id);
                    apiResponsavelContrato(listaResponsaveis.find(item => item.nome === response.data.nomeResponsavelContrato).id);
                    apiResponsavel(listaResponsaveis.find(item => item.nome === response.data.nomeResponsavel).id);
                }
            })
            .catch((error) => console.error(error));
    });

    //Cálculo de idade
    useEffect(() => {
        if(aluno.dataNascimento === undefined){
            setIdade("");
        } else {
            let dataNascimento = aluno.dataNascimento
            if (new Date().getMonth() + 1 < new Date(dataNascimento).getMonth() ||
                (new Date().getMonth() + 1 == new Date(dataNascimento).getMonth() + 1 &&
                    new Date().getDate() < new Date(dataNascimento).getDate())
            ) {
                setIdade(new Date().getFullYear() - new Date(dataNascimento).getFullYear() - 1 + " Anos");
            } else {
                setIdade(new Date().getFullYear() - new Date(dataNascimento).getFullYear() + " Anos");
            }
        }
    });

    function localizaMunicipio (sigla) {
        api.get(`/api/municipiosIbge/porEstado/${sigla}/?size=1000`)
            .then((response) => {
                setListaMunicipio(response.data.content);
            })
            .catch((error) => console.error(error))
    }

    function localizaEndereco (e) {
        api.get(`https://viacep.com.br/ws/${e}/json`)
            .then((response) => {
                if (response.status == 200) {
                    setAluno({...aluno, cep: e, logradouro: response.data.logradouro,
                        cidade: response.data.localidade, estado: response.data.uf, bairro: response.data.bairro
                    });
                }
            })
            .catch((error) => console.error(error))
    }

    function apiPai (id) {
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                setPai(response.data);
                listaResponsaveisContrato.find(item => item.nome === response.data.nome) ? "" :
                    listaResponsaveisContrato.push(response.data);
            })
            .catch((error) => console.error(error))
    }

    function apiMae (id) {
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                setMae(response.data);
                listaResponsaveisContrato.find(item => item.nome === response.data.nome) ? "" :
                    listaResponsaveisContrato.push(response.data);
            })
            .catch((error) => console.error(error))
    }

    function apiResponsavel (id) {
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                setResponsavel(response.data);
                listaResponsaveisContrato.find(item => item.nome === response.data.nome) ? "" :
                    listaResponsaveisContrato.push(response.data);
            })
            .catch((error) => console.error(error))
    }

    function apiResponsavelContrato (id) {
        api.get(`/api/responsavel/${id}`)
            .then((response) => {
                setResponsavelContrato(response.data);
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
        console.log(aluno)
        api.put((`/api/aluno/${id}`), aluno)
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
                                    Modificar Aluno(a)
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3} pb={3}>
                                <Grid container justifyContent='inherit' spacing={1}>
                                    {/*Identificação*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Identificação
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                label="Nome"
                                                type="text"
                                                value={aluno.nome}
                                                onChange={(e) => setAluno({...aluno, nome: e.target.value
                                                })}
                                        />
                                        </MDBox>
                                        </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <TextField
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
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
                                                InputLabelProps={{shrink:true}}
                                                label="Data de matricula"
                                                type="date"
                                                value={aluno.dataMatricula}
                                                onChange={(e) => {
                                                    setAluno({
                                                        ...aluno,
                                                        dataMatricula: e.target.value
                                                    });
                                                }}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MDBox mb={1}>
                                            <TextField
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                label="Idade"
                                                value={idade}
                                            />
                                        </MDBox>
                                    </Grid>
                                    {/*Sexo*/}
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
                                    {/*Naturalidade*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography fontSize={15} color="dark">
                                            Naturalidade
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={aluno.naturalidadeEstado}
                                                options={listaEstado}
                                                getOptionLabel={(option) =>
                                                {
                                                    const estado = listaEstado.find(item => item.sigla === option);
                                                    return option ? (estado ? estado.sigla : option.sigla) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.sigla === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, naturalidadeEstado: value.sigla});
                                                        localizaMunicipio(value.sigla);
                                                    } else {
                                                        setAluno({...aluno, naturalidadeEstado: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="UF" />
                                                }
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                value={aluno.naturalidadeCidade}
                                                options={listaMunicipio}
                                                getOptionLabel={(option) => {
                                                    const cidade = listaMunicipio.find(item => item.nome === option);
                                                    return option ? (cidade ? cidade.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, naturalidadeCidade: value.nome});
                                                    } else {
                                                        setAluno({...aluno, naturalidadeCidade: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Municipio"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={aluno.nacionalidade}
                                                options={listaNacionalidade}
                                                getOptionLabel={(option) => {
                                                    const nacionalidade = listaNacionalidade.find(item => item.nome === option);
                                                    return option ? (nacionalidade ? nacionalidade.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, nacionalidade: value.nome});
                                                    } else {
                                                        setAluno({...aluno, nacionalidade: ""});
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
                                    {/*Cuidados especiais*/}
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
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
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
                                    {/*Endereço*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography fontSize={15} color="dark">
                                            Endereço
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <InputMask
                                                mask="99999999"
                                                maskChar=""
                                                value={aluno.cep}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    cep: e.target.value
                                                })}
                                            >
                                                {() =>
                                                    <TextField
                                                        InputLabelProps={{shrink:true}}
                                                        fullWidth
                                                        label="CEP"
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
                                                label="Logradouro"
                                                value={aluno.logradouro}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    logradouro: e.target.value
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
                                                label="Complemento"
                                                multiline row={5}
                                                value={aluno.complemento}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    complemento: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Bairro"
                                                multiline row={5}
                                                value={aluno.bairro}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    bairro: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Cidade"
                                                value={aluno.cidade}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    cidade: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Estado"
                                                value={aluno.estado}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    estado: e.target.value
                                                })}
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
                                                value={pai.nome}
                                                options={listaResponsaveis}
                                                getOptionLabel={(option) => {
                                                    const respPai = listaResponsaveis.find(item => item.nome === option);
                                                    return option ? (respPai ? respPai.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, idPai: value.id});
                                                        apiPai(value.id);
                                                    } else {
                                                        setAluno({...aluno, idPai: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Nome do pai"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
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
                                                InputLabelProps={{shrink:true}}
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
                                                InputLabelProps={{shrink:true}}
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
                                                InputLabelProps={{shrink:true}}
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
                                                value={mae.nome}
                                                options={listaResponsaveis}
                                                getOptionLabel={(option) => {
                                                    const respMae = listaResponsaveis.find(item => item.nome === option);
                                                    return option ? (respMae ? respMae.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, idMae: value.id});
                                                        apiMae(value.id);
                                                    } else {
                                                        setAluno({...aluno, idMae: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Nome da mãe"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                    <MDBox mb={1}>
                                        <MDInput
                                            fullWidth
                                            InputLabelProps={{shrink:true}}
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
                                                    InputLabelProps={{shrink:true}}
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
                                                InputLabelProps={{shrink:true}}
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
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Contato trabalho"
                                                value={mae.telefoneTrabalho}
                                            />
                                        </MDBox>
                                    </Grid>

                                    {/*Responsável*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Outro Responsável
                                        </MDTypography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={1}>
                                            <Autocomplete
                                                value={responsavel.nome}
                                                options={listaResponsaveis}
                                                getOptionLabel={(option) => {
                                                    const resp = listaResponsaveis.find(item => item.nome === option);
                                                    return option ? (resp ? resp.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, idResponsavel: value.id});
                                                        apiResponsavel(value.id);
                                                    } else {
                                                        setAluno({...aluno, idResponsavel: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Nome do responsável"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Telefone"
                                                value={responsavel.telefone}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Profissão"
                                                value={responsavel.profissao}
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
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                type="text"
                                                label="Contato trabalho"
                                                value={responsavel.telefoneTrabalho}
                                            />
                                        </MDBox>
                                    </Grid>

                                    {/*Informações de matricula*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Informações de matrícula
                                        </MDTypography>
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
                                                        InputLabelProps={{shrink:true}}
                                                        label="Ano Letivo"
                                                    />
                                                }
                                            </InputMask>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                              value={aluno.anoInicial}
                                              options={listaAnoInicial}
                                              getOptionLabel={(option) => {
                                                  const anoInicial = listaAnoInicial.find(item => item.nome === option);
                                                  return option ? (anoInicial ? anoInicial.nome : option.nome) : "";
                                              }}
                                              isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                              onChange={(e, value) => {
                                                  if (value) {
                                                      setAluno({...aluno, anoInicial: value.nome});
                                                  } else {
                                                      setAluno({...aluno, anoInicial: ""});
                                                  }
                                              }}
                                              renderInput={(params) =>
                                                <TextField
                                                  {...params}
                                                  label="Ano inicial"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={aluno.situacao}
                                                options={listaSituacao}
                                                getOptionLabel={(option) => {
                                                    const situacao = listaSituacao.find(item => item.nome === option);
                                                    return option ? (situacao ? situacao.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, situacao: value.nome});
                                                    } else {
                                                        setAluno({...aluno, situacao: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Situação" />
                                                }
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={aluno.turma}
                                                options={listaTurma}
                                                getOptionLabel={(option) => {
                                                    const turma = listaTurma.find(item => item.nome === option);
                                                    return option ? (turma ? turma.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, turma: value.nome});
                                                    } else {
                                                        setAluno({...aluno, turma: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Turma" />
                                                }
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={aluno.turno}
                                                options={listaTurno}
                                                getOptionLabel={(option) => {
                                                    const turno = listaTurno.find(item => item.nome === option);
                                                    return option ? (turno ? turno.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
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
                                                        label="Turno" />
                                                }
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDBox mb={4}>
                                            <Autocomplete
                                                value={responsavelContrato.nome}
                                                options={listaResponsaveisContrato}
                                                getOptionLabel={(option) => {
                                                    const respContrato = listaResponsaveisContrato.find(item => item.nome === option);
                                                    return option ? (respContrato ? respContrato.nome : option.nome) : "";
                                                }}
                                                isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setAluno({...aluno, idResponsavelContrato: value.id});
                                                        apiResponsavelContrato(value.id);
                                                    } else {
                                                        setAluno({...aluno, idResponsavelContrato: ""});
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        InputLabelProps={{shrink:true}}
                                                        label="Contratante"/>}
                                            />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MDBox mb={1}>
                                            <MDInput
                                                fullWidth
                                                InputLabelProps={{shrink:true}}
                                                label="Data do contrato"
                                                type="date"
                                                value={aluno.dataContrato}
                                                onChange={(e) => setAluno({
                                                    ...aluno,
                                                    dataContrato: e.target.value
                                                })}
                                            />
                                        </MDBox>
                                    </Grid>
                                    {/*Emerência*/}
                                    <Grid item xs={12} md={12}>
                                        <MDTypography variant="h6" color="dark">
                                            Emergência
                                        </MDTypography>
                                    </Grid>
                                    <Grid container justifyContent="inherit" spacing={1} item xs={6}>
                                        <Grid item xs={12} md={12}>
                                            <MDTypography fontSize={15} color="dark">
                                                Contato 1
                                            </MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
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
                                                            InputLabelProps={{shrink:true}}
                                                            label="Telefone"
                                                        />
                                                    }
                                                </InputMask>
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MDBox mb={4}>
                                                <Autocomplete
                                                    value={aluno.nomeEmergencia1}
                                                    options={listaContatoEmergencia}
                                                    getOptionLabel={(option) => {
                                                        const nomeEm = listaContatoEmergencia.find(item => item.nome === option);
                                                        return option ? (nomeEm ? nomeEm.nome : option.nome) : "";
                                                    }}
                                                    isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            setAluno({...aluno, nomeEmergencia1: value.nome});
                                                        } else {
                                                            setAluno({...aluno, nomeEmergencia1: ""});
                                                        }
                                                    }}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            InputLabelProps={{shrink:true}}
                                                            label="Vínculo"/>}
                                                />
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="inherit" spacing={1} item xs={6}>
                                        <Grid item xs={12} md={12}>
                                            <MDTypography fontSize={15} color="dark">
                                                Contato 2
                                            </MDTypography>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
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
                                                            InputLabelProps={{shrink:true}}
                                                            label="Telefone"
                                                        />
                                                    }
                                                </InputMask>
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MDBox mb={4}>
                                                <Autocomplete
                                                    value={aluno.nomeEmergencia2}
                                                    options={listaContatoEmergencia}
                                                    getOptionLabel={(option) => {
                                                        const nomeEm = listaContatoEmergencia.find(item => item.nome === option);
                                                        return option ? (nomeEm ? nomeEm.nome : option.nome) : "";
                                                    }}
                                                    isOptionEqualToValue={(option, value) => option ? option.nome === value : false}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            setAluno({...aluno, nomeEmergencia2: value.nome});
                                                        } else {
                                                            setAluno({...aluno, nomeEmergencia2: ""});
                                                        }
                                                    }}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            InputLabelProps={{shrink:true}}
                                                            label="Vínculo"/>}
                                                />
                                            </MDBox>
                                        </Grid>
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
                                                InputLabelProps={{shrink:true}}
                                                label="Observação"
                                                multiline rows={4}
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


