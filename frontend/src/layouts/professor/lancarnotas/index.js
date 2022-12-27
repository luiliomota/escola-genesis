/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Tab, Tabs} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <MDBox sx={{ p: 3 }}>
                    <MDTypography>{children}</MDTypography>
                </MDBox>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Tables() {
    const [value, setValue] = useState(0);
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

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
                                <MDTypography variant="h6" color="white">
                                    Lanças Notas
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <MDBox px={2}>
                                    <MDBox>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="1º Bimeste" {...a11yProps(0)} />
                                            <Tab label="2º Bimestre" {...a11yProps(1)} />
                                            <Tab label="3º Bimestre" {...a11yProps(2)} />
                                            <Tab label="4º Bimestre" {...a11yProps(3)} />
                                        </Tabs>
                                    </MDBox>
                                    <TabPanel value={value} index={0}>
                                        Lista dos alunos aqui com o campo das notas do 1º Bimeste
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        Lista dos alunos aqui com o campo das notas do 2º Bimeste
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        Lista dos alunos aqui com o campo das notas do 3º Bimeste
                                    </TabPanel>
                                    <TabPanel value={value} index={3}>
                                        Lista dos alunos aqui com o campo das notas do 4º Bimeste
                                    </TabPanel>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Tables;
