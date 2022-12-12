import {useEffect, useState} from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/paciente/data/authorsTableData";
import MDInput from "../../components/MDInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "../../components/MDButton";
import api from "../../api";
import MDSnackbar from "../../components/MDSnackbar";

function Tables() {
  const { columns, rows, filtro, idPaciente, openDialog, setOpenDialog, setLista, setListaFiltro } = authorsTableData();
  const [searchText, setSearchText] = useState("");

  const [successSB, setSuccessSB] = useState(false);
  const [content, setContentSuccessSB] = useState("");
  const [errorSB, setErrorSB] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const openSuccessSB = (content) => {
      setSuccessSB(true);
      setContentSuccessSB(content);
  };
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

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
          <MDButton onClick={handleDeleteSubmit} autoFocus>
            Sim
          </MDButton>
        </DialogActions>
      </Dialog>
  );

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
            content="Por favor, exclua primeiro os tratamentos/usuários vinculados a este paciente. Se o erro persistir entre com contato com o suporte."
            dateTime=""
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );

    function handleDeleteSubmit() {
    api.delete((`/api/paciente/${idPaciente}`))
        .then((res) => {
          if(res.status === 200){
            openSuccessSB("Paciente excluido com sucesso");
            setOpenDialog(false);
            atualizarLista();
          }
        }).catch((error) => {
      openErrorSB();
      console.error(error)
    });
  }

  function atualizarLista(){
    api.get("/api/paciente?size=1000")
        .then((response) => {
          setLista(response.data.content);
          setListaFiltro(response.data.content);
        })
        .catch((error) => console.error(error));
  }

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
                  Paciente(s)
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox px={2}>
                  <MDInput
                    fullWidth
                    type="text"
                    label="Pesquisar"
                    value={searchText}
                    onChange={e => {
                        setSearchText(e.target.value);
                        filtro(e.target.value);
                      }
                    }
                  />
                </MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
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
