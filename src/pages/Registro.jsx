import { useNavigate } from "react-router-dom";

import RegisterMain from "../components/RegisterMain";

export default function Registro() {
    const navigate = useNavigate();

    return <RegisterMain onRegisterSuccess={() => navigate("/")} />;
}