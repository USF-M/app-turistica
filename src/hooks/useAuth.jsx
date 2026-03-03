import { useContext } from "react";
import AuthContext from "../contextos/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;