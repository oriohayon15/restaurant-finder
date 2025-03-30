import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router'

const LogIn = () => {
    const {register, handleSubmit} = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    const onSubmit = async (data) => {
        const { email, password } = data;

        try { 
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Logged in as:', user.uid, email);

            setErrorMessage('');

            router.push('/');

        } catch(error) { 
            if (error.code === 'auth/invalid-credential') {
                setErrorMessage('Invalid email/password.');
            }  else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Invalid email format.');
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center"> 
        <form  className="w-full max-w-lg px-6 sm:px-8 mx-auto mt-12 p-6 bg-white shadow-md rounded-lg flex flex-col gap-8" 
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back</h2>
        <label>
            <div className="flex flex-col gap-3">
            Email:
            <input type='text' {...register('email')} 
            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <br></br>
            <div className="flex flex-col gap-3">
            Password: 
            <input type='password' {...register('password')} 
            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
        </label>

        {errorMessage && (
            <div className="text-red-600 text-sm text-center mb-2">
        {errorMessage}
            </div>
        )}

        <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"  type='submit'>Log In</button>

    </form>
    </div>
    )
};

export default LogIn;