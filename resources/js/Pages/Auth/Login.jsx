import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        rememberMe: false,
    });

    const handleLogin = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <Head title="Login CBT EXAM" />
            <div className="w-full max-w-md text-center">
                <img src="/images/logo-unila.png" alt="UNILA" className="mx-auto w-24 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">CBT EXAM</h1>
                <p className="text-gray-500 text-sm mb-8">Fakultas Kedokteran Universitas Lampung</p>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <Input 
                        label="User"
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                        error={errors.username}
                        placeholder="Username"
                        icon="UserIcon"
                    />
                    <Input 
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        error={errors.password}
                        placeholder="Enter Password"
                        icon="LockIcon"
                    />
                    
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={data.rememberMe}
                                onChange={e => setData('rememberMe', e.target.checked)}
                                className="rounded border-gray-300 text-green-600" 
                            />
                            <span>Remember Me</span>
                        </label>
                        <a href="#" className="text-blue-600">Forgot Password?</a>
                    </div>

                    <Button 
                        type="submit" 
                        isLoading={processing} 
                        className="w-full bg-[#00a65a] hover:bg-[#008d4c] py-3"
                    >
                        Login
                    </Button>
                </form>

                <div className="mt-8 text-sm">
                    <p className="text-gray-500">Or don't have an account yet?</p>
                    <a href="#" className="text-blue-600 font-semibold underline">Create my account</a>
                </div>
                
                <footer className="mt-12 text-blue-600 text-xs">
                    <a href="#">Terms and Conditions</a>
                </footer>
            </div>
        </div>
    );
}