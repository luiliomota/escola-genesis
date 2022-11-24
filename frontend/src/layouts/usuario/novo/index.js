/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

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

function Tables() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    idPaciente: 0,
    perfil: "USER",
  });
  const [senhasNaoConferem, setSenhasNaoConferem] = useState(true);
  const [listaPerfis, setListaPerfis] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(() => {
    api.get("/api/perfil")
      .then((response) => {
        setListaPerfis(response.data);
      })
      .catch(error => console.error(error));

    api.get("/api/aluno")
        .then((response) => {
          setListaPacientes(response.data.content);
        })
        .catch((error) => console.error(error));

}, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Sucesso!"
      content="Usuário salvo com sucesso."
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
    api.post("/api/usuario", usuario)
        .then((res) => {
            if (res.status == 201) {
                openSuccessSB();
            }
        }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
  }

  function resetForm() {
    setUsuario({
      nome: "",
      email: "",
      senha: "",
    });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                <MDTypography variant="h6" color="white">
                  Novo Usuário
                </MDTypography>
              </MDBox>
              <MDBox p={3} pb={3}>
                <Grid container justifyContent='center' spacing={1}>
                  <Grid item xs={12} md={6}>
                    <MDBox component="form" role="form">
                      {/*<MDBox mb={2}>*/}
                        {/*<MDTypography variant="h6">*/}
                        {/*  Um mensagem de confirmação será enviada para o e-mail informado.*/}
                        {/*</MDTypography>*/}
                      {/*</MDBox>*/}
                      <MDBox mb={2}>
                        <MDInput
                            fullWidth
                            type="text"
                            label="Nome"
                            value={usuario.nome}
                            onChange={(e) => setUsuario({...usuario, nome: e.target.value})} />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                            fullWidth
                            type="email"
                            label="E-mail"
                            value={usuario.email}
                            onChange={(e) => setUsuario({...usuario, email: e.target.value})} />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                            fullWidth
                            type="password"
                            label="Senha"
                            value={usuario.senha}
                            onChange={(e) => setUsuario({...usuario, senha: e.target.value})} />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                            fullWidth
                            error={senhasNaoConferem}
                            helperText={senhasNaoConferem ? 'Senhas não conferem.' : ''}
                            type="password"
                            label="Confirmar Senha"
                            onChange={(e) => setSenhasNaoConferem(usuario.senha !== e.target.value)} />
                      </MDBox>
                      <FormControl fullWidth>
                        <MDBox mb={2}>
                          <InputLabel id="usuario-paciente-label">Perfil</InputLabel>
                          <Select
                            autoWidth
                            sx={{ lineHeight: '2.5em' }} 
                            labelId="usuario-perfil-label"
                            label="Perfil"
                            defaultValue={"USER"}
                            value={usuario.perfil}
                            onChange={(e) => setUsuario({...usuario, perfil: e.target.value})}
                            >
                            {
                              listaPerfis.map((item, index) => {
                                return <MenuItem key={index} value={item.nome}>{item.nome}</MenuItem>
                              })
                            }
                          </Select>
                        </MDBox>
                      </FormControl>
                      <MDBox mb={2}>
                        <Autocomplete
                            options={listaPacientes}
                            getOptionLabel={(option) => {
                              const paciente = listaPacientes.find( item => item.id === option);
                              return option ? (paciente ? paciente.nome : option.nome) : '';
                            }}
                            value={usuario.idPaciente}
                            isOptionEqualToValue={(option, value) => option.id === value}
                            onChange={(e, value) => {
                              if (value) {
                                setUsuario({...usuario, naturalidade: value.id})
                              } else {
                                setUsuario({...usuario, naturalidade: 0});
                              }
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Digite o nome do paciente"/>}
                        />
                      </MDBox>
                    </MDBox>
                  </Grid>                 
                </Grid>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
