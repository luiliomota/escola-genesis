/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/fundoceg.webp";
import bgImage2 from 'assets/images/ceg.png';

import { Context } from '../../../context/auth';
import {Image} from "@mui/icons-material";
import Footer from "../components/Footer";


function Basic() {
  const { mensagens, handleLogin } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Footer light />
      <Card style={{backgroundColor: 'transparent', boxShadow: 'none', alignItems: 'center'}}>
        <img style={{padding: '30px', width: '20rem'}} src={bgImage2}/>
      </Card>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="secondary"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Autenticar
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Senha" fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
            </MDBox>
            <MDBox textAlign="center">
              <MDTypography
                variant="h6"
                color="error">
                  {mensagens}
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="dark" fullWidth
                        onClick={() => handleLogin({username, password})}>
                Entrar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
