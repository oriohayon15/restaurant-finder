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
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            Email:
            <input type='text' {...register('email')} />
            Password: 
            <input type='password' {...register('password')} />
        </label>

        <button type='submit'>Log In</button>

    </form>
    )
}

export default LogIn;