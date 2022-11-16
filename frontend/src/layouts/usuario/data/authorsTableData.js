/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useState, useEffect } from "react";

import {Delete, Edit} from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import api from "api";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";

export default function data() {
  const [idUsuario, setIdUsuario] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [lista, setLista] = useState([]);
  const [listaFiltro, setListaFiltro] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    
    api.get("/api/usuario?size=1000&sort=id,desc")
      .then((response) => {
        setLista(response.data.content);
        setListaFiltro(response.data.content);
      })
      .catch((error) => console.error(error));
    
    return () => {};
  }, []);

  const Author = ({name, email, perfil}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
        <MDTypography variant="caption">{perfil}</MDTypography>
      </MDBox>
    </MDBox>
  );

  function getItems(items) {
    if (items == undefined) return [];

    return items.length == 0 ? [] : items.map((item) => {
      return (
        {
          nome: <Author name={item.nome} email={item.email} />,
          perfil: <Author perfil={item.perfis[0].nome} />,
          action: (
              <>
                  <IconButton component="a" onClick={() => navigate(`/usuario/atualizar/${item.id}`)} variant="caption" color="text" fontWeight="medium">
                      <Edit fontSize="medium" />
                  </IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <IconButton component="a" onClick={() => {setOpenDialog(true);setIdUsuario(item.id)}} color="error" variant="gradient" fontWeight="medium">
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
      { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
      { Header: "Perfil", accessor: "perfil", width: "45%", align: "center" },
    ],

    rows: getItems(lista),
    filtro: (searchText) => {
      let filter = listaFiltro.filter(item =>
        item.nome.toLowerCase().includes(searchText.toLowerCase())
        || item.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setLista(filter);
    },
      idUsuario: idUsuario,
      openDialog: openDialog,
      setOpenDialog: setOpenDialog,
      setLista: setLista,
      setListaFiltro: setListaFiltro,
  };
}
