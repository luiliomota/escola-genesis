/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import {Link} from "@mui/material";
import {Edit, CalendarToday} from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

import {Context} from "context/auth";
import api from "api";

export default function data() {
    const {roles} = useContext(Context);
    const navigate = useNavigate();

    const [lista, setLista] = useState([]);
    const [listaFiltro, setListaFiltro] = useState([]);

    function getItems(items) {
        if (items === undefined) return [];

        return items.length === 0 ? [] : items.map((item) => {
                return (
                    {
                        nome: <MDTypography display="block" variant="body2">{item.nome}</MDTypography>,
                        serie: <MDTypography variant="subtitle2">{item.serie} - {item.turma}</MDTypography>,
                        turno: <MDTypography variant="subtitle2">{item.turno}</MDTypography>,
                        anoLetivo: <MDTypography variant="subtitle2" fontWeight="medium">{item.anoLetivo}</MDTypography>,
                        status: (
                            <MDBox ml={-1}>
                                <MDBadge
                                    badgeContent={item.status} color={(() => {
                                        if (item.status === "CRIADA") return "light";
                                        if (item.status === "EM ANDAMENTO") return "info";
                                        if (item.status === "FINALIZADA") return "success";
                                        return "dark";
                                    })()}
                                    variant="gradient" size="sm" />
                            </MDBox>
                        ),
                        acao: (
                            <>
                                <MDButton
                                    component="a"
                                    onClick={() => navigate(`/disciplina/lancarnotas/${item.id}`)}
                                    variant="outlined"
                                    size="small"
                                    color="info">
                                    Notas&nbsp;
                                    <Edit />
                                </MDButton>
                                &nbsp;
                                <MDButton
                                    component="a"
                                    onClick={() => navigate(`/disciplina/frequencia/${item.id}`)}
                                    variant="outlined"
                                    size="small"
                                    color="info">
                                    Frequência&nbsp;
                                    <CalendarToday fontSize="medium"/>
                                </MDButton>
                            </>
                        ),
                    });
            }
        );
    }

    if (roles[0] === 'DIRECAO') {
        return {
            columns: [
                {Header: "Nome", accessor: "nome", align: "left"},
                {Header: "Série", accessor: "serie",align: "right"},
                {Header: "Turno", accessor: "turno", align: "center"},
                {Header: "Ano Letivo", accessor: "anoLetivo", align: "center"},
                {Header: "Status", accessor: "status", align: "center"},
                {Header: "Ação", accessor: "acao", align: "center"},
            ],

            rows: getItems(lista),
            filtro: (searchText) => {
                let filter = listaFiltro.filter(item => item.nome.toLowerCase().includes(searchText.toLowerCase()));
                setLista(filter);
            },
            setLista: setLista,
            setListaFiltro: setListaFiltro,
        };
    }

    return {
        columns: [
            {Header: "Nome", accessor: "nome", width: "45%", align: "left"},
            {Header: "Status", accessor: "status", align: "center"},
            // { Header: "Ação", accessor: "acao", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
            let filter = listaFiltro.filter(item => item.nome.toLowerCase().includes(searchText.toLowerCase()));
            setLista(filter);
        },
        setLista: setLista,
        setListaFiltro: setListaFiltro,
    };
}
