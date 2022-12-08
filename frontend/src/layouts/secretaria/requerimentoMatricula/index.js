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
                <MDBox p={3} pb={3} display="flex" alignItems="center"
                       sx={{flexDirection: 'column'}}>
                  <Grid>
                    <MDBox component="img" src={logo} alt="Brand" width="10rem"/>
                  </Grid>
                  <Grid>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      Rua T-02. Qd 01, Lote 12A - Setor Santa Fé
                    </MDTypography>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      Taquaralto - Palmas - TO
                    </MDTypography>
                    <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                      Fone (63) 3571-5751
                    </MDTypography>
                    <br/>
                    <MDTypography mb={0} variant="h5" color="dark" textTransform="uppercase" sx={{textAlign: 'center'}}>
                      Requerimento de Matrícula - Ano Letivo: 2023
                    </MDTypography>
                  </Grid>
                </MDBox>
                <MDBox p={3} pb={3} ml={3} mr={3}>
                <Grid container justifyContent='inherit' spacing={1}>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="h6" color="dark">
                      IDENTIFICAÇÃO DO(A) ALUNO(A)
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography variant="body2" color="dark">
                      Nome: {aluno.nome}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Data de Nascimento: {aluno.dataNascimento}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Sexo: {aluno.sexo}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography variant="body2" color="dark">
                      Naturalidade: {aluno.naturalidade}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="h6" color="dark">
                      FILIAÇÃO
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Pai: {aluno.nomePai}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Profissão: {aluno.profissaoPai}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Local de Trabalho: {aluno.localTrabalhoPai}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Contato: {aluno.telefonePai}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Mãe: {aluno.nomeMae}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Profissão: {aluno.profissaoMae}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Local de Trabalho: {aluno.localTrabalhoMae}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDTypography variant="body2" color="dark">
                      Contato: {aluno.telefoneMae}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography variant="body2" color="dark">
                      Endereço Residencial: {aluno.logradouro+" "+aluno.complemento+", "+aluno.bairro+", "+aluno.cidade+"-"+aluno.estado}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <MDTypography variant="body2" color="dark">
                        CEP: {aluno.cep}
                      </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography variant="body2" color="dark">
                      Telefones: {aluno.contatoEmergencia1} / {aluno.contatoEmergencia2}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="h6" color="dark">
                      SITUAÇÃO ESCOLAR
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="body2" color="dark">
                      {aluno.anoInicial+" - "+aluno.situacao}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="h6" color="dark">
                      OUTRAS INFORMAÇÕES
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="body2" color="dark">
                      Turno: {aluno.turno}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <MDTypography mb={1} variant="body2" color="dark">
                      Necessita de cuidados especiais? {aluno.cuidadoEspecial}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <MDTypography mb={1} variant="body2" color="dark">
                      Especificar: {aluno.especificacao}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="body2" color="dark">
                      {aluno.observacao}
                    </MDTypography>
                  </Grid>
                  <br/>
                  <Grid container justifyContent='inherit' spacing={1}>
                    <Grid item xs={12} md={12}>
                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'end'}}>
                        Palmas, {new Date().toLocaleDateString()}
                        {/*Palmas, {moment.locale('pt-br')}*/}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <MDTypography mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                        ______________________________________
                      </MDTypography>
                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                        Pai/Mãe ou Responsável
                      </MDTypography>
                      <br/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDTypography mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                        ______________________________________
                      </MDTypography>
                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                        Diretor (a)
                      </MDTypography>
                      <br/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDTypography mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                        ______________________________________
                      </MDTypography>
                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
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
