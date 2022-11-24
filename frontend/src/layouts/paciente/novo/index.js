import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import api from "api";

const pacienteDefault = {
  nome: "",
  sexo: "Masculino",
  dataNascimento: `${new Date().getFullYear()}-${(new Date().getMonth()+1) < 10 ? '0' : ''}${(new Date().getMonth()+1)}-${new Date().getDate()}`,
};

function Tables() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    idPaciente: 0,
    perfil: "PACIENTE",
  });
  const [senhasNaoConferem, setSenhasNaoConferem] = useState(true);
  const [listaPerfis, setListaPerfis] = useState([]);

  const [paciente, setPaciente] = useState(pacienteDefault);
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
  }, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Sucesso!"
      content="Paciente salvo com sucesso."
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
    api.post("/api/aluno", paciente)
        .then((res) => {
            console.table(res);
            if (res.status == 201) {
                    api.post("/api/usuario", {...usuario, idPaciente: res.data.id})
                        .then((res) => {
                          console.table(res);
                          if (res.status == 201) {
                            openSuccessSB();
                          }
                        }).catch((error) => {
                      openErrorSB();
                      console.error(error)
                    });
            }
        }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
  }

  function resetForm() {
    setPaciente(pacienteDefault);
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
              Novo Paciente
            </MDTypography>
          </MDBox>
          <MDBox p={3} pb={3}>
            <Grid container justifyContent='center' spacing={1}>
              <Grid item xs={12} md={6}>
                <MDBox component="form" role="form">
                  <MDBox p={2}>
                    <MDInput
                        fullWidth
                        label="Nome"
                        value={paciente.nome}
                        onChange={(e) => {
                          setPaciente({...paciente, nome: e.target.value});
                          setUsuario({...usuario, nome: e.target.value});
                        }} />
                  </MDBox>
                  <MDBox p={2}>
                    <MDInput
                        fullWidth
                        type="email"
                        label="E-mail"
                        value={usuario.email}
                        onChange={(e) => setUsuario({...usuario, email: e.target.value})} />
                  </MDBox>
                  <MDBox p={2}>
                    <MDInput
                        fullWidth
                        type="password"
                        label="Senha"
                        value={usuario.senha}
                        onChange={(e) => setUsuario({...usuario, senha: e.target.value})} />
                  </MDBox>
                  <MDBox p={2}>
                    <MDInput
                        fullWidth
                        error={senhasNaoConferem}
                        helperText={senhasNaoConferem ? 'Senhas não conferem.' : ''}
                        type="password"
                        label="Confirmar Senha"
                        onChange={(e) => setSenhasNaoConferem(usuario.senha !== e.target.value)} />
                  </MDBox>
                  <MDBox p={2}>
                    <FormControl fullWidth>
                      <FormLabel id="select-sexo-label">Sexo</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="select-sexo-label"
                        name="select-sexo-radio-group"
                        value={paciente.sexo}
                        onChange={(e) => setPaciente({...paciente, sexo: e.target.value})}
                      >
                        <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                        <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                      </RadioGroup>
                    </FormControl>
                  </MDBox>
                  <MDBox p={2}>
                    <MDInput
                        label="Data de Nascimento"
                        type="date"
                        value={paciente.dataNascimento}
                        onChange={(e) => setPaciente({...paciente, dataNascimento: e.target.value})} />
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
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
