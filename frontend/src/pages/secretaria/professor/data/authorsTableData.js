/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useContext, useEffect, useState} from "react";
import {Delete, Edit} from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import api from "api";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../../context/auth";

export default function data() {
    const [idProfessor, setIdProfessor] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const [lista, setLista] = useState([]);
    const [listaFiltro, setListaFiltro] = useState([]);
    const {roles} = useContext(Context);
    const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/professor?size=1000")
      .then((response) => {
        setLista(response.data.content);
        setListaFiltro(response.data.content);
      })
      .catch((error) => console.error(error));

    return () => {};
  }, []);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  function getItems(items) {
    if (items == undefined) return [];

    return items.length == 0 ? [] : items.map((item) => {
      return (
        {
            nome: <Author name={item.nome}/>,
            dataCadastro: <Author name={item.dataCadastro}/>,
            acao: (
        <>
                    <IconButton component="a" onClick={() => navigate(`/secretaria/professor/modificar/${item.id}`)} variant="caption" color="text" fontWeight="medium">
                          <Edit fontSize="medium" />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton component="a" onClick={() => {setOpenDialog(true);setIdProfessor(item.id)}} color="error" variant="gradient" fontWeight="medium">
                        <Delete fontSize="medium" />
                    </IconButton>
                </>
            ),
        });
      }
    );
  }

    if(roles[0] === 'DIRECAO'){
      return {
        columns: [
            { Header: "Modificar", accessor: "acao", align: "center" },
            { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
            { Header: "Data Cadastro", accessor: "dataCadastro", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
          let filter = listaFiltro.filter(item =>
            item.nome.toLowerCase().includes(searchText.toLowerCase())
          );
          setLista(filter);
        },
          idProfessor: idProfessor,
          openDialog: openDialog,
          setOpenDialog: setOpenDialog,
          setLista: setLista,
          setListaFiltro: setListaFiltro,
      };
    }
    return {
        columns: [
            { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
            { Header: "Data Cadastro", accessor: "dataCadastro", align: "center" },
            // { Header: "Ação", accessor: "acao", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
          let filter = listaFiltro.filter(item =>
            item.nome.toLowerCase().includes(searchText.toLowerCase())
          );
          setLista(filter);
    },
        idProfessor: idProfessor,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        setLista: setLista,
        setListaFiltro: setListaFiltro,
    };
}
