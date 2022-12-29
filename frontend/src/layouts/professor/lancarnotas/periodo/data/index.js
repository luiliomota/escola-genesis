/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useContext, useEffect, useState} from "react";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import {Context} from "context/auth";
import api from "api";

export default function data(idPeriodo) {
    const {roles} = useContext(Context);

    const [lista, setLista] = useState([]);
    const [listaFiltro, setListaFiltro] = useState([]);

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
        <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
        </MDTypography>
    );

    function getItems(items) {
        if (items === undefined) return [];

        return items.length === 0 ? [] : items.map((item) => {
                return (
                    {
                        nome: <Author name={item.nome} />,
                        nota1: (
                            <MDInput
                                type="number"
                                label="Nota 1">
                            </MDInput>
                        ),
                        nota2: (
                            <MDInput
                                type="number"
                                label="Nota 2">
                            </MDInput>
                        ),
                        nota3: (
                            <MDInput
                                type="number"
                                label="Nota 3">
                            </MDInput>
                        ),
                        nota4: (
                            <MDInput
                                type="number"
                                label="Nota 4">
                            </MDInput>
                        ),
                    });
            }
        );
    }

    if (roles[0] === 'DIRECAO') {
        return {
            columns: [
                {Header: "Nome", accessor: "nome", width: "45%", align: "left"},
                // { Header: "Status", accessor: "status", align: "center" },
                {Header: "Nota 1", accessor: "nota1", align: "center"},
                {Header: "Nota 2", accessor: "nota2", align: "center"},
                {Header: "Nota 3", accessor: "nota3", align: "center"},
                {Header: "Nota 4", accessor: "nota4", align: "center"},
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
