import {useContext, useEffect} from "react";
import {Context} from "../../../context/auth";

const logout = () => {
    const {authenticated, handleLogout} = useContext(Context);
    useEffect(() => handleLogout());
    return <></>;
}

export default logout;
