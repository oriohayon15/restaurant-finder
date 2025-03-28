import {useForm} from 'react-hook-form';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';

const SignUp = () => {
    const {register, handleSubmit} = useForm();
    
    const onSubmit = async (data) => {
        const { email, password, name } = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User created:', user.uid, email, name);
        } catch(error) {
            console.error('Error signing up:', error.message);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name: 
                <input type='text' {...register('name')} />
                Email:
                <input type='text' {...register('email')} />
                Password: 
                <input type='password' {...register('password')} />
            </label>

            <button type='submit'>Sign Up</button>

        </form>
    )
}

export default SignUp
  