import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import axios from 'axios';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const res = await axios.get(`http://localhost:5001/api/users/${firebaseUser.uid}`);
                    setUser({ ...res.data, uid: firebaseUser.uid });
                } catch (error) {
                    console.error('Failed to fetch user from DB:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);