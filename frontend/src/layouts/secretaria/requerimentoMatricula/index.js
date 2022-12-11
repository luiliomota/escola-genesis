/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useCallback, useEffect, useRef, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Print} from "@mui/icons-material";
import {Autocomplete, TextField} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDButton from "components/MDButton";

import api from "api";
import {useReactToPrint} from 'react-to-print';
import logo from "../../../assets/images/ceg.png";
import moment from "moment";

function Tables() {
  // moment.locale('pt-BR');
  // console.log(moment().format('LL'));
  const [idade, setIdade] = useState();

  const componentRef = useRef(null);

  const [aluno, setAluno] = useState({
    nome: "",
    id: 0,
  });
  const [listaAlunos, setListaAlunos] = useState([]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
  });

  //Cálculo de idade
  useEffect(() => {
    if(aluno.dataNascimento == undefined){
      setIdade("");
    } else {
      if (new Date().getMonth() + 1 < new Date(aluno.dataNascimento).getMonth() ||
          (new Date().getMonth() + 1 == new Date(aluno.dataNascimento).getMonth() + 1 &&
              new Date().getDate() < new Date(aluno.dataNascimento).getDate())
      ) {
        setIdade(new Date().getFullYear() - new Date(aluno.dataNascimento).getFullYear() - 1 + " Anos");
      } else {
        setIdade(new Date().getFullYear() - new Date(aluno.dataNascimento).getFullYear() + " Anos");
      }
    }
  });

  useEffect(() => {
    api.get("/api/aluno?size=500")
    .then((response) => {
        setListaAlunos(response.data.content);
      })
      .catch((error) => console.error(error))
  }, []);

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
                <MDTypography textTransform="uppercase" variant="h6" color="white">
                  Requerimento Matrícula
                </MDTypography>
              </MDBox>
              <MDBox p={3} pb={3}>
                <Grid container justifyContent='inherit' spacing={1}>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="h6" color="dark">
                      Nome aluno(a)
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <MDBox mb={1}>
                      <Autocomplete
                        options={listaAlunos}
                        getOptionLabel={(option) => option ? option.nome : ""}
                        isOptionEqualToValue={(option, value) => option ? value : ""}
                        onChange={(e, value) => {
                          if (value) {
                            console.log(value);
                            setAluno(value);
                          }
                        }}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            label="Digite o nome do(a) aluno(a)"/>}
                      />
                    </MDBox>
                  </Grid>
                </Grid>

                <Grid mt={2} container justifyContent='inherit' spacing={2}>
                  <Grid item xs={12} md={5}>
                    <MDButton
                      fullWidth
                      variant="gradient"
                      startIcon={<Print/>}
                      onClick={handlePrint}
                      color="dark">
                      Visualizar Impressão
                    </MDButton>
                  </Grid>
                </Grid>

              </MDBox>
            </Card>
            <br/>
            <Card>
              <div ref={componentRef}>
                <MDBox p={6} ml={3} mr={3}>
                  <Grid container justifyContent='center' alignItems="center" spacing={1} mr={2} ml={2}>
                {/*<MDBox p={3} pb={1} display="flex" alignItems="center"*/}
                {/*       sx={{flexDirection: 'column'}}>*/}
                  <Grid item xs={12} md={1}>
                    <MDBox component="img" src={logo} alt="Brand" width="8rem"/>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      GÊNESIS CENTRO EDUCACIONAL LTDA ME
                    </MDTypography>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      Rua T-02. Qd 01, Lote 12A - Setor Santa Fé
                    </MDTypography>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      Taquaralto - Palmas - TO
                    </MDTypography>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      Fone (63) 3571-5751
                    </MDTypography>
                  </Grid>
                  <MDBox p={3} pb={1}>
                    <Grid container justifyContent='center' alignItems="center" spacing={1} mr={2} ml={2}>
                      <Grid>
                        <MDTypography mb={0} variant="h5" color="dark" textTransform="uppercase" sx={{textAlign: 'center'}}>
                          Requerimento de Matrícula - Ano Letivo: 2023
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                  </Grid>
                </MDBox>
                <MDBox p={1} pb={3} ml={3} mr={3}>
                <Grid container justifyContent='inherit' spacing={1} mr={2} ml={2}>
                  <Grid item xs={12} md={12}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="h6" color="dark">
                      IDENTIFICAÇÃO DO(A) ALUNO(A)
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Nome: </b>{aluno.nome}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={3}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Data de Nascimento: </b>{aluno.dataNascimento}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={3}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Idade: </b>{idade}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Sexo: </b>{aluno.sexo}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Naturalidade: </b>{aluno.naturalidade}
                    </MDTypography>
                  </Grid>

                  <br/>
                  <Grid item xs={12} md={12}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="h6" color="dark">
                      FILIAÇÃO
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Pai: </b>{aluno.nomePai}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Profissão: </b>{aluno.profissaoPai}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Local de Trabalho: </b>{aluno.localTrabalhoPai}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Contato: </b>{aluno.telefonePai}
                    </MDTypography>
                  </Grid>

                  <br/>
                  <Grid item ml={2} xs={6} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Mãe: </b>{aluno.nomeMae}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Profissão: </b>{aluno.profissaoMae}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Local de Trabalho: </b>{aluno.localTrabalhoMae}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={6} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Contato: </b>{aluno.telefoneMae}
                    </MDTypography>
                  </Grid>

                  <br/>
                  <Grid item xs={12} md={12}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="h6" color="dark">
                      ENDEREÇO
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Logradouro: </b>{aluno.logradouro}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Complemento: </b>{aluno.complemento}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Bairro: </b>{aluno.bairro}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={2}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Cidade: </b>{aluno.cidade}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={4}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Estado: </b>{aluno.estado}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={4}>
                      <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                        <b>CEP: </b>{aluno.cep}
                      </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={6}>
                    <MDTypography fontSize="0.8rem" variant="body2" color="dark">
                      <b>Telefones: </b>{aluno.contatoEmergencia1} / {aluno.contatoEmergencia2}
                    </MDTypography>
                  </Grid>

                  <br/>
                  <Grid item xs={12} md={12}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="h6" color="dark">
                      SITUAÇÃO ESCOLAR
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={10}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="body2" color="dark">
                      {aluno.anoInicial} - {aluno.situacao} / {aluno.turno}
                    </MDTypography>
                  </Grid>

                  <br/>
                  <Grid item xs={12} md={12}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="h6" color="dark">
                      OUTRAS INFORMAÇÕES
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={4}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="body2" color="dark">
                      <b>Necessita de cuidados especiais? </b>{aluno.cuidadoEspecial}
                    </MDTypography>
                  </Grid>
                  <Grid item ml={2} xs={12} md={6}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="body2" color="dark">
                      <b>Especificar: </b>{aluno.especificacao}
                    </MDTypography>
                  </Grid>
                  <Grid pb={4} item ml={2} xs={12} md={10}>
                    <MDTypography fontSize="0.8rem" mb={1} variant="body2" color="dark">
                      <b>Observações: </b>{aluno.observacao}
                    </MDTypography>
                  </Grid>
                  <Grid container justifyContent='inherit' spacing={1}>
                    <Grid item xs={12} md={12}>
                      <MDTypography fontSize="0.8rem" mb={0} mr={6} variant="h6" color="dark" sx={{textAlign: 'end'}}>
                        Palmas, {new Date().toLocaleDateString()}
                        {/*Palmas, {moment.locale('pt-br')}*/}
                      </MDTypography>
                    </Grid>
                    <Grid pb={6} item xs={12} md={12}>
                      <MDTypography fontSize="0.8rem" mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                        ______________________________________
                      </MDTypography>
                      <MDTypography fontSize="0.8rem" mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                        Pai/Mãe ou Responsável
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDTypography fontSize="0.8rem" mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                        ______________________________________
                      </MDTypography>
                      <MDTypography fontSize="0.8rem" mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                        Diretor (a)
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDTypography fontSize="0.8rem" mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                        ______________________________________
                      </MDTypography>
                      <MDTypography fontSize="0.8rem" mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                        Secretário (a)
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer/>
    </DashboardLayout>
  );
}

export default Tables;
