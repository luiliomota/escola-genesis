/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useContext, useEffect, useState} from "react";

import {Switch} from "@mui/material";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import {Context} from "context/auth";
import api from "api";

export default function data(idPeriodo) {
    const {roles} = useContext(Context);

    const [lista, setLista] = useState([]);
    const [listaFiltro, setListaFiltro] = useState([]);
    const aulasNoBimestre = [1,2,3,4,5,6,7,8];

    useEffect(() => {
        //TODO carregar lista de alunos da disciplina
        api.get("/api/aluno?size=30")
            .then((response) => {
                setLista(response.data.content);
                setListaFiltro(response.data.content);
            })
            .catch((error) => console.error(error));

        return () => {};
    }, []);
    const Author = ({name}) => (
        <MDTypography display="block" variant="h6" sx={{fontSize: '0.8em'}}>
            {name}
        </MDTypography>
    );

    function getItems(items) {
        if (items === undefined) return [];

        const rows = {};

        aulasNoBimestre.forEach((aula, index) => {
            rows['presente' + index] = <Switch key={index} />;
        });

        return items.length === 0 ? [] : items.map((item) => {
                return (
                    {
                        nome: <Author name={item.nome} />,
                        ...rows
                    });
            }
        );
    }

    function getHeaders(items) {
        const headers = aulasNoBimestre.map((aula, index) => {
            return {
                Header:
                    <>
                        <MDInput
                            fullWidth
                            InputLabelProps={{shrink:true}}
                            label="Data da aula"
                            type="date"
                            size="small"
                            onChange={(e) => {}} />
                        <MDTypography variant="h6" pt={1}
                                      sx={{fontSize: '0.9em', textTransform: 'uppercase'}}>
                            Todos presentes?
                        </MDTypography>
                        <Switch />
                    </>,
                accessor: "presente" + index,
                align: "center"
            }
        });

        return [
            {Header: "Nome", accessor: "nome", align: "left"},
            // { Header: "Status", accessor: "status", align: "center" },
            ...headers,
        ];
    }

    if (roles[0] === 'DIRECAO') {
        return {
            columns: getHeaders(lista),
            rows: getItems(lista),
            filtro: (searchText) => {
                let filter = listaFiltro.filter(item =>
                    item.nome.toLowerCase().includes(searchText.toLowerCase())
                );
                setLista(filter);
            },
            setLista: setLista,
            setListaFiltro: setListaFiltro,
        };
    }

    return {
        columns: [
            {Header: "Nome", accessor: "nome", width: "45%", align: "left"},
            // { Header: "Ação", accessor: "acao", align: "center" },
        ],

        rows: getItems(lista),
        filtro: (searchText) => {
            let filter = listaFiltro.filter(item =>
                item.nome.toLowerCase().includes(searchText.toLowerCase())
            );
            setLista(filter);
        },
        setLista: setLista,
        setListaFiltro: setListaFiltro,
    };
}
