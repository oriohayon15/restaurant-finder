import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';
import axios from 'axios';
import { useRouter } from 'next/router'

const SignUp = () => {
    const {register, handleSubmit} = useForm();
    const [firebaseError, setFirebaseError] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter()

    
    const onSubmit = async (data) => {
        const { email, password, name } = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User created:', user.uid, email, name);

            const response = await axios.post('http://localhost:5001/api/users', {name, email, uid: user.uid});
            console.log('Saved to DB:', response.data);

            setErrorMsg('');

            router.push('/');

        } catch(error) {
            if (error.code === 'auth/weak-password') {
                setFirebaseError('Password must be at least 6 characters.');
            } else if (error.code === "auth/email-already-in-use") {
                    setErrorMsg("An account with this email already exists. Try logging in instead.");
                } else {
                setFirebaseError(error.message);
            }
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center">
        <form className="w-full max-w-lg px-6 sm:px-8 mx-auto mt-12 p-6 bg-white shadow-md rounded-lg flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>
            <label>
                <div className="flex flex-col gap-3">
                Name: 
                <input type='text' {...register('name')} 
                className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <br></br>
                <div className="flex flex-col gap-3">
                Email:
                <input type='text' {...register('email')}
                className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <br></br>
                <div className="flex flex-col gap-3" >
                Password: 
                <input type='password' {...register('password')} 
                className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"/>
                </div>
                <small className="text-sm text-gray-500 mt-1">
                    Password must be at least 6 characters.
                </small>
            </label>
            
            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
            {firebaseError && (
                <p className="text-red-500 text-sm mt-2 text-center">{firebaseError}</p>
            )}

            <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer" type='submit' >Sign Up</button>

        </form>
        </div>
    )
}

export default SignUp
  