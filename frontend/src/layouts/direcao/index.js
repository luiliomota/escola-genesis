/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

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
import authorsTableData from "layouts/direcao/data/authorsTableData";
import MDInput from "../../components/MDInput";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "../../components/MDButton";
import MDSnackbar from "../../components/MDSnackbar";
import api from "../../api";

function Tables() {
  const { columns, rows, filtro, idTratamento, openDialog, setOpenDialog, setLista, setListaFiltro } = authorsTableData();
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
            content="Por favor, entre em contato com o suporte."
            dateTime=""
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
        />
    );

    function handleDeleteSubmit() {
        api.delete((`/api/tratamento/${idTratamento}`))
            .then((res) => {
                if(res.status === 200){
                    openSuccessSB("Tratamento excluido com sucesso");
                    setOpenDialog(false);
                    atualizarLista();
                }
            }).catch((error) => {
            openErrorSB();
            console.error(error)
        });
    }

    function atualizarLista(){
        api.get("/api/tratamento?size=1000")
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
                  Direção
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox px={2}>
                  <MDInput
                    fullWidth
                    type="text"
                    label="Pesquisar (nome, descrição)"
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
