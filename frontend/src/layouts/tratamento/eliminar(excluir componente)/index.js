import api from "../../../api";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const eliminar = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    function handleDeleteSubmit() {
        api.delete((`/api/tratamento/${id}`))
    }

    useEffect(() => {
        handleDeleteSubmit();
        navigate('/tratamento/todos');
    });

    return <></>;
}
export default eliminar;
