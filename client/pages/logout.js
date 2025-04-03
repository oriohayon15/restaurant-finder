import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

const Logout = () => {
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            setMessage('Logged out successfully.');
        })
        .catch((error) => {
            console.error('Error logging out:', error)
        });
    }
    return (
        <div>
        <button 
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
        onClick={handleLogout}>
            Log Out
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default Logout;