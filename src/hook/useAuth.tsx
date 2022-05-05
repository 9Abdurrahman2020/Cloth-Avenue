import { useContext } from "react";
import { authContext } from "../components/context/AuthProvider";

const useAuth = () =>{

    return useContext(authContext)
    
}
export default useAuth;