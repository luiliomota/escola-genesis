/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

function Tables() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    idPaciente: 0,
    perfil: "PACIENTE",
  });
  const [senhasNaoConferem, setSenhasNaoConferem] = useState(true);
  const [listaPerfis, setListaPerfis] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);

  const [contentSB, setContentSuccessSB] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const openSuccessSB = (content) => {
    setSuccessSB(true);
    setContentSuccessSB(content);
  };
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const handleClickOpenDialog = () => setOpenConfirmDialog(true);
  const handleCloseDialog = () => setOpenConfirmDialog(false);

  useEffect(() => {
    api.get(`/api/usuario/${id}`)
      .then((response) => {
        if(response.data.idPaciente === null){
          setUsuario({
            ...response.data,
            perfil: response.data.perfis[0].nome,
            naturalidade: 0,
          });
        } else {
          setUsuario({
            ...response.data,
            perfil: response.data.perfis[0].nome,
          });
        }
      })
      .catch(error => console.error(error));

    api.get("/api/perfil")
      .then((response) => {
        setListaPerfis(response.data);
      })
      .catch(error => console.error(error));

    api.get("/api/aluno")
      .then((response) => {
        setListaPacientes(response.data.content);
      })
      .catch((error) => console.error(error))
  }, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Sucesso!"
      content={contentSB}
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

  const renderConfirmDialog = (
    <Dialog
      open={openConfirmDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirmar exclusão?"}
      </DialogTitle>
      <DialogActions>
        <MDButton onClick={handleCloseDialog}>Cancelar</MDButton>
        <MDButton onClick={excluir} autoFocus>
          Sim
        </MDButton>
      </DialogActions>
    </Dialog>
  );

  function handleSubmit() {
    api.put(`/api/usuario/${id}`, usuario)
        .then((res) => {
            if (res.status === 200) {
              openSuccessSB("Usuário salvo com sucesso.");
            }
        }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
  }

  function excluir() {
    api.delete(`/api/usuario/${id}`)
      .then((response) => {
        openSuccessSB("Usuário excluído com sucesso.");
        setOpenConfirmDialog(false);
        //navigate("/paciente/todos");
      })
      .catch((error) => {
        openErrorSB();
        console.error(error);
      });
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {renderSuccessSB}
        {renderErrorSB}
        {renderConfirmDialog}
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
                  Alterar Usuário
                </MDTypography>
              </MDBox>
              <MDBox p={3} pb={3}>
                <Grid container justifyContent='center' spacing={1}>
                  <Grid item xs={12} md={6}>                 
                    <MDBox component="form" role="form">
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
                          <InputLabel id="usuario-perfil-label">Perfil</InputLabel>
                          <Select
                            autoWidth
                            sx={{ lineHeight: '2.5em' }} 
                            labelId="usuario-perfil-label"
                            label="Perfil"
                            defaultValue={"PACIENTE"}
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
                              setUsuario({...usuario, naturalidade: value.id});
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
                        onClick={handleClickOpenDialog}>
                          Excluir
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
