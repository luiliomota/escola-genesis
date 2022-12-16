/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

// @mui material components
import { Autocomplete, TextField, Grid, Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import api from "api";

export default function Impressao() {
  const { idAluno } = useParams();
  const [aluno, setAluno] = useState({});

  useEffect(() => {
    api.get(`/api/aluno/${idAluno}`)
      .then((response) => {
        setAluno(response.data);
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
                  Contrato
                </MDTypography>
              </MDBox>
              <MDBox p={3} pb={3}>
                <Grid container justifyContent='inherit' spacing={1}>
                  {/*Identificação*/}
                  <Grid item xs={12} md={12}>
                    <MDTypography mb={1} variant="h6" color="dark">
                      Nome aluno(a)
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <MDBox mb={1}>
                      {aluno.nome}
                    </MDBox>
                  </Grid>

                </Grid>

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer/>
    </DashboardLayout>
  );
}
