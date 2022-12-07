/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {forwardRef, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

// @mui material components
import { Grid, Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import api from "api";
import logo from "assets/images/ceg.png";
import Button from "@mui/material/Button";

export const Impressao = forwardRef((props, ref) => {
  const { idAluno } = props;
  const [aluno, setAluno] = useState({});

  useEffect(() => {
    console.log("useEffect Impressão");
    api.get(`/api/aluno/${idAluno}`)
      .then((response) => {
        setAluno(response.data);
      })
      .catch((error) => console.error(error))
  }, []);


  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: "hidden" }}
    >
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="baseline" height="100%">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
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
                      <Button onClick={forceUpdate}>Force Update</Button>
                      <MDTypography textTransform="uppercase" variant="h6" color="white">
                        Contrato
                      </MDTypography>
                    </MDBox>
                    <MDBox p={3} pb={3} display="flex" alignItems="center"
                           sx={{flexDirection: 'column'}}>
                      <Grid>
                        <MDBox component="img" src={logo} alt="Brand" width="10rem" />
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
                      </Grid>
                    </MDBox>
                    <MDBox p={3} pb={3}>
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
                            Profissão: {aluno.profissaoPai}
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
                            Endereço Residencial: {aluno.telefoneMae}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <MDTypography variant="body2" color="dark">
                            Telefones: {aluno.telefoneMae} (mãe) / {aluno.telefonePai} (pai)
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <MDTypography mb={1} variant="h6" color="dark">
                            SITUAÇÃO ESCOLAR
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <MDTypography mb={1} variant="body2" color="dark">
                            Nível: {aluno.situacao}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <MDTypography mb={1} variant="h6" color="dark">
                            OUTRAS INFORMAÇÕES
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <MDTypography mb={1} variant="body2" color="dark">
                            {aluno.observacao}
                          </MDTypography>
                        </Grid>
                      </Grid>

                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
});