import React, { useState } from 'react';
import { useAuth } from 'pocketbase-react/src';

import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const ADMIN_EMAIL = 'pocketbase@mariansam.eu';

export const AdminLoginPage: React.FC = () => {
    const { user, isSignedIn, actions: { signInWithEmailAdmin } } = useAuth();

    const [password, setPassword] = useState("");

    const login = () => {
        signInWithEmailAdmin(ADMIN_EMAIL, password);
    };

    return (
        <div className='p-4 mx-auto'>
            <h3>Admin panel</h3>
            <img src='https://kagi.com/proxy/dancing-hotdog.gif?c=LwXhtTInURWSS6isT8YHWKe8FwnGJQHVUI8ripCyb5_bo5Nz6m4FFRepUDLKKGEiwUgilfKdVgJGOj_FkTWB3oVDNKsQqxkcy779n6bix2g%3D' className='mw-100'></img>
            <FormControl type="password" className='my-2 py-2' placeholder='heslo zmrde' onChange={(e) => setPassword(e.target.value)} />
            <Button className='mx-auto' onClick={() => login()} style={{display: "block"}}>Login</Button>
        </div>
    );
};
