/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Autocomplete, Icon, TextField } from "@mui/material";

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
import ReactImageUploading from "react-images-uploading";
import "assets/theme/components/form/inputLabel"
import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "styles.css";
import Loading from "../../../components/Loading";
import ImagemComparador from "./ImagemComparador";

function Tables() {
  const resizebase64 = require('resize-base64');

  const { id } = useParams();
  const navigate = useNavigate();

  const [tratamento, setTratamento] = useState({
    titulo: "",
    descricao: "",
    nomePaciente: "",
    status: "",
    idPaciente: 0,
  });

  const [listaPacientes, setListaPacientes] = useState([]);
  const [listaStatusTratamento, setListaStatusTratamento] = useState([]);
  const [listaCategoriaImagens, setListaCategoriaImagens] = useState([]);
  const [primeiraCategoria, setPrimeiraCategoria] = useState('');
  const [segundaCategoria, setSegundaCategoria] = useState('');
  const [listaImagens, setListaImagens] = useState([]);
  const [listaUmCombinacaoImagens, setListaUmCombinacaoImagens] = useState([]);
  const [listaDoisCombinacaoImagens, setListaDoisCombinacaoImagens] = useState([]);
  const [listaImagensParaSalvar, setLlistaImagensParaSalvar] = useState([]);
  
  const [isLoadingPrimeiraLista, setIsLoadingPrimeiraLista] = useState(true);
  const [isLoadingSegundaLista, setIsLoadingSegundaLista] = useState(true);
  const [isLoadingPrimeiraListaEsquerda, setIsLoadingPrimeiraListaEsquerda] = useState(false);
  const [isLoadingPrimeiraListaDireita, setIsLoadingPrimeiraListaDireita] = useState(false);

  const quadrosParaComparar = { primeraCategoria: "primeira", segundaCategoria: "segunda"};

  const [successSB, setSuccessSB] = useState(false);
  const [deleteSuccessSB, setDeleteSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openDeleteSuccessSB = () => setDeleteSuccessSB(true);
  const closeDeleteSuccessSB = () => setDeleteSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(() => {
    api.get(`/api/tratamento/${id}`)
      .then((response) => {
          tratamento.dataCriacao === undefined && setTratamento(response.data);
      })
      .catch((error) => console.error(error));

    api.get("/api/paciente")
      .then((response) => {
        setListaPacientes(response.data.content)
      })
      .catch((error) => console.error(error));

    api.get("/api/status_tratamento")
      .then((response) => {
        setListaStatusTratamento(response.data)
      })
      .catch((error) => console.error(error));

    api.get(`/api/imagem/tratamento/${id}`)
      .then((response) => {
        setListaImagens(response.data.content)
      })
      .catch((error) => console.error(error));

    api.get(`/api/imagem/categorias`)
        .then((response) => {
            setListaCategoriaImagens(response.data);
            setPrimeiraCategoria(response.data[0].nome);
            setSegundaCategoria(response.data[1].nome);

            setIsLoadingPrimeiraLista(true);
            setIsLoadingSegundaLista(true);

            atualizarImagens(response.data[0].nome, quadrosParaComparar.primeraCategoria);
            atualizarImagens(response.data[1].nome, quadrosParaComparar.segundaCategoria);
          })
          .catch((error) => console.error(error));

  }, []);

    function atualizarImagens(categoria, primeiroOuSegundoQuadro) {
        api.get(`/api/combinacaoImagens/${categoria}/tratamento/${id}`)
            .then((response) => {
                if (primeiroOuSegundoQuadro === quadrosParaComparar.primeraCategoria) {
                    setPrimeiraCategoria(categoria);
                    setListaUmCombinacaoImagens(response.data.content);

                    setIsLoadingPrimeiraLista(false);
                } else if (primeiroOuSegundoQuadro === quadrosParaComparar.segundaCategoria) {
                    setSegundaCategoria(categoria);
                    setListaDoisCombinacaoImagens(response.data.content);

                    setIsLoadingSegundaLista(false);
                }
            })
            .catch((error) => console.error(error));
    }

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

    const renderDeleteSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sucesso!"
            content="Imagem excluida."
            dateTime=""
            open={deleteSuccessSB}
            onClose={closeDeleteSuccessSB}
            close={closeDeleteSuccessSB}
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
      api.put((`/api/tratamento/${id}`), tratamento)
        .then((res) => {
            console.table(res);
            if (res.status === 200) {
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
      status: "",
    });
  }

  function onChangeImages(values) {
    // console.table(values);
    setLlistaImagensParaSalvar(values);
  }

  function atualizarCategoria(event, idImagem) {
    api.put(`/api/imagem/${idImagem}`, {
      categoria: event.target.value
    })
      .then((res) => {
        if (res.status === 200) {
          api.get(`/api/imagem/tratamento/${id}`)
            .then((response) => {
              setListaImagens(response.data.content)
            });
        }
      }).catch((error) => {
        openErrorSB();
        console.error(error);
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
        {/*Titulo, descrição, paciente, status*/}
          <MDBox pt={6} pb={3}>
            {renderSuccessSB}
            {renderDeleteSuccessSB}
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
                    bgColor='dark'
                    borderRadius="lg"
                    coloredShadow="secondary"
                  >
                    <MDTypography variant="h6" color="white">
                      Tratamento
                    </MDTypography>
                  </MDBox>
                  <MDBox p={3} pb={3}>
                    <Grid container justifyContent='center' spacing={1}>
                      <Grid item xs={12} md={6}>
                        <MDBox component="form" role="form">
                          {/*  Titulo*/}
                          <MDBox mb={2}>
                            <MDInput
                                fullWidth
                                type="text"
                                label="Titulo"
                                value={tratamento.titulo}
                                onChange={(e) => setTratamento({...tratamento, nome: e.target.value})} />
                          </MDBox>
                          {/*  Descrição*/}
                          <MDBox mb={2}>
                            <MDInput
                                fullWidth
                                type="text"
                                multiline rows={5}
                                label="Descrição"
                                value={tratamento.descricao}
                                onChange={(e) => setTratamento({...tratamento, dataNascimento: e.target.value})} />
                          </MDBox>
                          {/*  Paciente*/}
                          <MDBox mb={2}>
                            <Autocomplete
                              options={listaPacientes}
                              getOptionLabel={(option) => option ? option.nome : ""}
                              value={{id: 0, nome: tratamento.nomePaciente}}
                              isOptionEqualToValue={(option, value) => option ? value : ""}
                              onChange={(e, value) => {
                                if (value) {
                                  setTratamento({...tratamento, naturalidade: value.id, sexo: value.nome})
                                } else {
                                  setTratamento({...tratamento, naturalidade: 0});
                                }
                              }}
                              renderInput={(params) =>
                                <TextField
                                  {...params}
                                  label="Digite o nome do paciente" />}
                            />
                          </MDBox>
                          {/*  Status*/}
                          <MDBox mb={2}>
                            <Autocomplete
                              options={listaStatusTratamento}
                              getOptionLabel={(option) => option ? option.nome : ""}
                              value={{id: 0, nome: tratamento.status}}
                              isOptionEqualToValue={(option, value) => option ? value : ""}
                              onChange={(e, value) => {
                                if (value) {
                                  setTratamento({...tratamento, status: value.nome})
                                } else {
                                  setTratamento({...tratamento, status: ""});
                                }
                              }}
                              renderInput={(params) =>
                                <TextField
                                  {...params}
                                  label="Status" />}
                            />
                          </MDBox>
                        </MDBox>
                      </Grid>
                    </Grid>
                      {/*Botão salvar e limpar*/}
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
          {/*Inserir e editar imagens*/}
          <MDBox pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                  <MDBox pb={3}>
                    <Grid container spacing={0}>
                      <Grid style={{backgroundColor:'darkgray',borderRight:'groove', borderRadius:'1rem'}} item xs={12} mb={2} md={6}>
                          {/*<MDTypography variant='h6'>Esquerda</MDTypography>*/}
                          <Swiper pagination={true} modules={[Pagination]}>
                              {
                                  isLoadingPrimeiraLista ?
                                      <Grid display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            minHeight="70vh">
                                          <Loading type="spin" />
                                      </Grid> :
                                listaUmCombinacaoImagens.map((image, index) => (
                                  <SwiperSlide key={index} item="true" xs={12} md={12}>
                                      <Grid item={true} container justifyContent='center'>
                                          <MDButton style={{backgroundColor:'transparent',fontSize:'xx-large'}}>{image.nome}</MDButton>
                                      </Grid>
                                      <Grid container justifyContent="center">
                                               
                                        <ImagemComparador 
                                          idTratamento={id} 
                                          idCombinacao={image.id} 
                                          image={image.imagem1Base64} 
                                          tipo={image.tipo} 
                                          lado="esquerdo" 
                                          success={openSuccessSB} 
                                          error={openErrorSB} />
                                        <ImagemComparador 
                                          idTratamento={id} 
                                          idCombinacao={image.id} image={image.imagem2Base64}
                                          tipo={image.tipo} 
                                          lado="direito" 
                                          success={openSuccessSB} 
                                          error={openErrorSB} />
    
                                        </Grid>
                                    </SwiperSlide>
                                  )
                                )
                              }
                          </Swiper>
                      </Grid>
                      <Grid style={{backgroundColor:'darkgray',borderRight:'groove', borderRadius:'1rem'}} item xs={12} mb={2} md={6}>
                            <Swiper pagination={true} modules={[Pagination]}>
                                {
                                    isLoadingSegundaLista ?
                                        <Grid display="flex"
                                              justifyContent="center"
                                              alignItems="center"
                                              minHeight="70vh">
                                            <Loading type="spin" />
                                        </Grid> :
                                    listaDoisCombinacaoImagens.map((image, index) => (
                                            <SwiperSlide key={index} item="true" xs={12} md={12}>
                                                <Grid item={true} container justifyContent='center'>
                                                    <MDButton style={{backgroundColor:'transparent',fontSize:'xx-large'}}>{image.nome}</MDButton>
                                                </Grid>
                                                <Grid container justifyContent="center">
                                                        
                                                  <ImagemComparador 
                                                    idTratamento={id} 
                                                    idCombinacao={image.id} 
                                                    image={image.imagem1Base64} 
                                                    tipo={image.tipo} 
                                                    lado="esquerdo" 
                                                    success={openSuccessSB} 
                                                    error={openErrorSB} />
                                                  <ImagemComparador 
                                                    idTratamento={id} 
                                                    idCombinacao={image.id} image={image.imagem2Base64}
                                                    tipo={image.tipo} 
                                                    lado="direito" 
                                                    success={openSuccessSB} 
                                                    error={openErrorSB} />
 
                                                </Grid>
                                            </SwiperSlide>
                                        )
                                    )
                                }
                            </Swiper>
                        </Grid>
                    </Grid>
                  </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <Footer />
    </DashboardLayout>
  );
}

export default Tables;
