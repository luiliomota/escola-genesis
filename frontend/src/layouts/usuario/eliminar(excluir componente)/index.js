import api from "../../../api";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const eliminar = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    function handleDeleteSubmit() {
        api.delete((`/api/usuario/${id}`))
    }

    useEffect(() => {
        handleDeleteSubmit();
        navigate('/usuario/todos');
    });
    return <></>;
}
export default eliminar;
