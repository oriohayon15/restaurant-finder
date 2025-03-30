import {useForm} from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const LogIn = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try { 
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Logged in as:', user.uid, email);
        } catch(error) {
            console.error('Login error:', error.message);
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

        <button class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"  type='submit'>Log In</button>

    </form>
    </div>
    )
};

export default LogIn;