import { createContext } from 'react';
import useFirebase from '../../hook/useFirebase';
export const authContext = createContext<any>(undefined!);

const AuthProvider = ({children}:{children:JSX.Element}) => {
    
    const allContext = useFirebase();

    return (
        <authContext.Provider value={allContext}>

            {children}
            
        </authContext.Provider>
    );
};

export default AuthProvider;