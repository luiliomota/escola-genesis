import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

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
  const { id } = useParams();

  const [paciente, setPaciente] = useState({
    nome: "",
    sexo: "",
    dataNascimento: "",
  });
  const [successSB, setSuccessSB] = useState(false);
  const [content, setContentSuccessSB] = useState("");
  const [errorSB, setErrorSB] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const openSuccessSB = (content) => { 
    setSuccessSB(true);
    setContentSuccessSB(content);
  };
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const handleClickOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    api.get(`/api/paciente/${id}`)
      .then((response) => {
        setPaciente(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleSubmit() {
    api.put(`/api/paciente/${id}`, {
      ...paciente,
      nomeSexo: paciente.sexo
    })
        .then((res) => {
            if (res.status === 200) {
                openSuccessSB("Paciente salvo com sucesso.");
            }
        }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
  }

  function excluir() {
    api.delete(`/api/paciente/${id}`)
      .then((response) => {
        openSuccessSB("Paciente excluído com sucesso.");
        setOpenDialog(false);
        //navigate("/paciente/todos");
      })
      .catch((error) => {
        openErrorSB();
        console.error(error);
      });
  }

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Sucesso!"
      content={content}
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

  const renderDialog = (
    <Dialog
        open={openDialog}
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {renderSuccessSB}
        {renderErrorSB}
        {renderDialog}
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
                  Editar Paciente
                </MDTypography>
              </MDBox>
              <MDBox p={3} pb={3}>
                <Grid container justifyContent='center' spacing={1}>
                  <Grid item xs={12} md={6}>                
                    <MDBox component="form" role="form"> 
                      <MDBox py={2}>
                        <MDInput
                          fullWidth
                          label="Nome"
                          type="text"
                          value={paciente.nome}
                          onChange={(e) => setPaciente({...paciente, nome: e.target.value})} />
                      </MDBox>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                          <MDBox py={2}>
                            <FormControl fullWidth>
                              <FormLabel id="select-sexo-label">Sexo</FormLabel>
                              <RadioGroup
                                sx={{lineHeight: '2em'}}
                                row
                                aria-labelledby="select-sexo-label"
                                name="select-sexo-radio-group"
                                value={paciente.sexo}
                                onChange={(e) => setPaciente({...paciente, sexo: e.target.value})}
                              >
                                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                                {/*<FormControlLabel value="Outro" control={<Radio />} label="Outro" />*/}
                              </RadioGroup>
                            </FormControl>
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <MDBox py={3}>
                            <MDInput
                                fullWidth
                                type="date"
                                label="Data de Nascimento"
                                value={paciente.dataNascimento}
                                onChange={(e) => setPaciente({...paciente, dataNascimento: e.target.value})} />
                          </MDBox>
                        </Grid>
                      </Grid>                
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
