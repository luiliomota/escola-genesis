/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import {Delete, Edit} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import {Context} from "../../../../../context/auth";
import api from "api";

export default function data() {
    const [idResponsavel, setIdResponsavel] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const [lista, setLista] = useState([]);
    const [listaFiltro, setListaFiltro] = useState([]);
    const {roles} = useContext(Context);
    const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/responsavel?size=1000")
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
          dataCadastro: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item.dataCadastro}
            </MDTypography>
          ),
            // curso: <Author name={item.anoInicial+"/"+item.turno}/>,
            // status: (
            //     <MDBox ml={-1}>
            //         <MDBadge badgeContent={item.status} color={(() => {
            //             if (item.status === "MATRICULADO") return "success";
            //             if (item.status === "INATIVO") return "light";
            //             return "dark";
            //         })()}
            //                  variant="gradient" size="sm" />
            //     </MDBox>
            // ),
            acao: (
                <>
                    <IconButton component="a" onClick={() => navigate(`/secretaria/responsavel/modificar/${item.id}`)} variant="caption" color="text" fontWeight="medium">
                        <Edit fontSize="medium" />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton component="a" onClick={() => {setOpenDialog(true);setIdResponsavel(item.id)}} color="error" variant="gradient" fontWeight="medium">
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
            // { Header: "Curso", accessor: "curso", align: "center" },
            { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
            { Header: "Data Cadastro", accessor: "dataCadastro", align: "center" },
            // { Header: "Status", accessor: "status", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
          let filter = listaFiltro.filter(item =>
            item.nome.toLowerCase().includes(searchText.toLowerCase())
          );
          setLista(filter);
        },
          idResponsavel: idResponsavel,
          openDialog: openDialog,
          setOpenDialog: setOpenDialog,
          setLista: setLista,
          setListaFiltro: setListaFiltro,
      };
    }
    return {
        columns: [
            { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
            { Header: "Status", accessor: "status", align: "center" },
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
        idResponsavel: idResponsavel,
        openDialog: openDialog,
        setOpenDialog: setOpenDialog,
        setLista: setLista,
        setListaFiltro: setListaFiltro,
    };
}
