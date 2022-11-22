/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useState, useEffect, useContext} from "react";

import { Link } from "@mui/material";
import { Edit, Compare, Delete } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import api from "api";
import IconButton from "@mui/material/IconButton";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../../context/auth";

export default function data() {
    const [idTratamento, setIdTratamento] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const [lista, setLista] = useState([]);
    const [listaFiltro, setListaFiltro] = useState([]);
    const {roles} = useContext(Context);
    const navigate = useNavigate();

  useEffect(() => {

    api.get("/api/tratamento?size=1000&sort=id,desc")
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
          titulo: <Author name={item.titulo} email={item.nomePaciente} />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={item.status} color={(() => {
                if (item.status === "CRIADO") return "light";
                if (item.status === "EM ANDAMENTO") return "info";
                if (item.status === "FINALIZADO") return "success";
                return "dark";
              })()}
              variant="gradient" size="sm" />
            </MDBox>
          ),
          dataCriacao: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item.dataCriacao}
            </MDTypography>
          ),
          visualizar: (
                <IconButton component="a" onClick={() => navigate(`/tratamento/comparador/${item.id}`)} variant="caption" color="text" fontWeight="medium">
                    <Compare fontSize="medium" />
                </IconButton>
          ),
          acao: (
                <>
                     <IconButton component="a" onClick={() => navigate(`/tratamento/atualizar/${item.id}`)} variant="caption" color="text" fontWeight="medium">
                        <Edit fontSize="medium" />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton component="a" onClick={() => {setOpenDialog(true);setIdTratamento(item.id)}} color="error" variant="gradient" fontWeight="medium">
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
          { Header: "Ação", accessor: "acao", align: "center" },
          { Header: "Título", accessor: "titulo", width: "45%", align: "left" },
          { Header: "Status", accessor: "status", align: "center" },
          { Header: "Inicio do Tratamento", accessor: "dataCriacao", align: "center" },
          { Header: "Visualizar", accessor: "visualizar", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
          let filter = listaFiltro.filter(item =>
            item.titulo.toLowerCase().includes(searchText.toLowerCase())
            || item.nomePaciente.toLowerCase().includes(searchText.toLowerCase())
            || item.descricao.toLowerCase().includes(searchText.toLowerCase())
          );
          setLista(filter);
        },
          idTratamento: idTratamento,
          openDialog: openDialog,
          setOpenDialog: setOpenDialog,
          setLista: setLista,
          setListaFiltro: setListaFiltro,
      };
    }
    return {
        columns: [
            { Header: "Visualizar", accessor: "visualizar", align: "center" },
            { Header: "Título", accessor: "titulo", width: "45%", align: "left" },
            { Header: "Status", accessor: "status", align: "center" },
            { Header: "Inicio do Tratamento", accessor: "dataCriacao", align: "center" },
            // { Header: "Ação", accessor: "acao", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
          let filter = listaFiltro.filter(item =>
            item.titulo.toLowerCase().includes(searchText.toLowerCase())
            || item.nomePaciente.toLowerCase().includes(searchText.toLowerCase())
            || item.descricao.toLowerCase().includes(searchText.toLowerCase())
          );
          setLista(filter);
        },
        idTratamento: idTratamento,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        setLista: setLista,
        setListaFiltro: setListaFiltro,
    };
}
