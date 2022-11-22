/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {FormControl, Icon, InputLabel, Select} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import api from "api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MenuItem from "@mui/material/MenuItem";
import {RWebShare} from "react-web-share";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";

import Loading from 'components/Loading';

function Tables() {
  const { id } = useParams();

  const [tratamento, setTratamento] = useState({
    titulo: "",
    descricao: "",
    status: "",
    idPaciente: 0
  });

  const [primeiraListaImagens, setPrimeiraListaImagens] = useState([]);
  const [segundaListaImagens, setSegundaListaImagens] = useState([]);
  const [listaCategoriaImagens, setListaCategoriaImagens] = useState([]);
  const [primeiraCategoria, setPrimeiraCategoria] = useState('');
  const [segundaCategoria, setSegundaCategoria] = useState('');

  const [isLoadingPrimeiraLista, setIsLoadingPrimeiraLista] = useState(true);
  const [isLoadingSegundaLista, setIsLoadingSegundaLista] = useState(true);

  const quadrosParaComparar = { primeraCategoria: "primeira", segundaCategoria: "segunda"};

  useEffect(() => {
    api.get(`/api/tratamento/${id}`)
      .then((response) => {
          tratamento.dataCriacao === undefined && setTratamento(response.data);
      })
      .catch((error) => console.error(error));

    api.get(`/api/imagem/categorias`)
      .then((response) => {
        setListaCategoriaImagens(response.data);

        setPrimeiraCategoria(response.data[0].nome);
        setSegundaCategoria(response.data[1].nome);

        atualizarImagens(response.data[0].nome, quadrosParaComparar.primeraCategoria);
        atualizarImagens(response.data[1].nome, quadrosParaComparar.segundaCategoria);
      })
      .catch((error) => console.error(error));

  }, []);

  function atualizarImagens(categoria, primeiroOuSegundoQuadro) {
    setIsLoadingPrimeiraLista(true);
    setIsLoadingSegundaLista(true);

    api.get(`/api/combinacaoImagens/${categoria}/tratamento/${id}`)
      .then((response) => {
        if (primeiroOuSegundoQuadro === quadrosParaComparar.primeraCategoria) {
          setPrimeiraCategoria(categoria);
          setPrimeiraListaImagens(response.data.content);

          setIsLoadingPrimeiraLista(false);
        } else if (primeiroOuSegundoQuadro === quadrosParaComparar.segundaCategoria) {
          setSegundaCategoria(categoria);
          setSegundaListaImagens(response.data.content);

          setIsLoadingSegundaLista(false);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/*Titulo, descrição, status*/}
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
                  Tratamento
                </MDTypography>
              </MDBox>
              <MDBox p={3} pb={3}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <MDBox component="form" role="form">                  
                      <MDBox mb={2}>
                        <MDTypography variant="h6">
                          Título:
                        </MDTypography>
                        <MDTypography variant="subtitle1">
                          {tratamento.titulo}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={2}>
                      <MDTypography variant="h6">
                          Descrição:
                        </MDTypography>
                        <MDTypography variant="subtitle1">
                          {tratamento.descricao}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={2}>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDTypography variant="h6">
                          Status:
                        </MDTypography>
                        <MDTypography variant="subtitle1">
                          {tratamento.status}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/*Visualização de imagens*/}
      <MDBox pb={3}>
        <Grid container spacing={0}>
          <Grid style={{backgroundColor:'darkgray',borderRight:'groove', borderRadius:'1rem'}} item xs={12} mb={2} md={6}>
            <Swiper pagination={true} modules={[Pagination]}>
              {
                isLoadingPrimeiraLista ?
                  <Grid display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="70vh">
                    <Loading type="spin" />
                  </Grid> :
                primeiraListaImagens.map((image, index) => (
                  <SwiperSlide key={index} item="true" xs={12} md={6}>
                    {/*<Grid item={true} container justifyContent='center'>*/}
                    {/*  <MDButton style={{backgroundColor:'transparent',fontSize:'xx-large'}}>{image.nome}</MDButton>*/}
                    {/*</Grid>*/}
                    <Grid container justifyContent='center'>
                      <Grid item={true} xs={6} md={6}>
                          <img
                            style={{borderRadius:"1rem", width: '98%', height: '450px', objectFit: 'cover'}}
                            src={`data:${image};base64,${image.imagem1Base64}`}
                          />
                      </Grid>
                      <Grid item={true} xs={6} md={6}>
                          <img
                            style={{borderRadius:"1rem", width: '98%', height: '450px', objectFit: 'cover'}}
                            src={`data:${image};base64,${image.imagem2Base64}`}
                          />
                      </Grid>
                    </Grid>
                    </SwiperSlide>
                  )
                )
              }
            </Swiper>
          </Grid>
          <Grid style={{backgroundColor:'darkgray',borderRight:'groove', borderRadius:'1rem'}}  item xs={12} mb={2} md={6}>
            <Swiper pagination={true} modules={[Pagination]}>
              {
                isLoadingSegundaLista ?
                  <Grid display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="70vh">
                    <Loading type="spin" />
                  </Grid> :
                segundaListaImagens.map((image, index) => (
                        <SwiperSlide key={index} item="true" xs={12} md={6}>
                          {/*<Grid item={true} container justifyContent='center'>*/}
                          {/*  <MDButton style={{backgroundColor:'transparent',fontSize:'xx-large'}}>{image.nome}</MDButton>*/}
                          {/*</Grid>*/}
                          <Grid container justifyContent='center'>
                            <Grid item={true} xs={6} md={6}>
                              <img
                                  style={{borderRadius:"1rem", width: '98%', height: '450px', objectFit: 'cover'}}
                                  src={`data:${image};base64,${image.imagem1Base64}`}
                              />
                            </Grid>
                            <Grid item={true} xs={6} md={6}>
                              <img
                                  style={{borderRadius:"1rem", width: '98%', height: '450px', objectFit: 'cover'}}
                                  src={`data:${image};base64,${image.imagem2Base64}`}
                              />
                            </Grid>
                          </Grid>
                        </SwiperSlide>
                    )
                )
              }
            </Swiper>
          </Grid>
          <Grid container mt={2} justifyContent='center'>
              <RWebShare data={{
                title:' Compartilhe',
                url: 'https://www.alf5.com.br/',
              }} onClick={() => console.log("Compartilhamento realizado com sucesso!")}
              >
                <MDButton
                    target="_blank"
                    rel="noreferrer"
                    color="dark"
                >
                  Gostou ? Compartilhe&nbsp;&nbsp;&nbsp;
                  <ShareIcon/>
                </MDButton>
              </RWebShare>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
