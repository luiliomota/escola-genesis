/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import team2 from "assets/images/team-2.jpg";
import api from "api";
import {Delete, Edit} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function data() {
  const [idPaciente, setIdPaciente] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [lista, setLista] = useState([]);
  const [listaFiltro, setListaFiltro] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {

    api.get("/api/paciente?size=1000&sort=id,desc")
      .then((response) => {
        setLista(response.data.content);
        setListaFiltro(response.data.content);
      })
      .catch((error) => console.error(error));

    return () => {};
    }, []);

  const Author = ({ image, name}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/*<MDAvatar src={image} name={name} size="sm" />*/}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

    function getItems(items) {
    if (items == undefined) return [];

    return items.length == 0 ? [] : items.map((item) => {
      return (
        {
          author: <Author image={team2} name={item.nome} />,
          function: <Job description={item.sexo} />,
          status: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.dataNascimento}
            </MDTypography>
          ),
          employed: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.dataCadastro}
            </MDTypography>
          ),
          action: (
            <>
                <IconButton component="a" onClick={() => navigate(`/paciente/editar/${item.id}`)} variant="caption" color="text" fontWeight="medium">
                    <Edit fontSize="medium" />
                </IconButton>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <IconButton component="a" onClick={() => {setOpenDialog(true);setIdPaciente(item.id)}} color="error" variant="gradient" fontWeight="medium">
                    <Delete fontSize="medium" />
                </IconButton>
            </>
          ),
        });
      }
    );
  }

  return {
    columns: [
      { Header: "Ação", accessor: "action", align: "center" },
      { Header: "nome", accessor: "author", width: "45%", align: "left" },
      { Header: "sexo", accessor: "function", align: "left" },
      { Header: "data de nascimento", accessor: "status", align: "center" },
      { Header: "data de cadastro", accessor: "employed", align: "center" },
    ],
    rows: getItems(lista),
    filtro: (searchText) => {
      let filter = listaFiltro.filter(item =>
        item.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setLista(filter);
    },
      idPaciente: idPaciente,
      openDialog: openDialog,
      setOpenDialog: setOpenDialog,
      setLista: setLista,
      setListaFiltro: setListaFiltro,
  };
}
