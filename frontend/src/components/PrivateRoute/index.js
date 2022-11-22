import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';

import { Context } from 'context/auth';
import { useContext } from 'react';

// const perfis = { DIRECAO: "DIRECAO", SECRETARIA: "SECRETARIA"}

export default function PrivateRoute({ perfis }) {
    const { loading, authenticated, roles } = useContext(Context);

    // console.log("Roles: " + roles[0]);
    // console.log("Perfis: " + perfis);
    // console.log("Tem Perfis?: " + (perfis.indexOf(roles[0])));

    if (loading) {
        return <h2>Carregando...</h2>
    }

    if (authenticated && perfis && perfis.indexOf(roles[0]) === -1) {
        //TODO redirecionar para uma página dizendo que o usuário não tá autorizado.
        return <h2>Usuário não autorizado.</h2>
    }

    return authenticated ? <Outlet /> : <Navigate to="/authentication/sign-in" />;
}