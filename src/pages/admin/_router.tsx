import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from "wouter";
import { useAuth } from 'pocketbase-react/src';
import { AdminHomePage } from './home';
import { AdminLoginPage } from './_login';

export const AdminRouter: React.FC = () => {
    const { user, isSignedIn, actions } = useAuth();
    console.log({user, isSignedIn, actions});

    useEffect(() => {
        document.title = 'ADMIN gjpcup2';

        return () => {
            document.title = 'GJP Cup 2023';
        };
    }, [])

    if (isSignedIn === null)
        return null;

    if (isSignedIn === false) {
        return (
            <Switch>
                <Route path="/admin/login" component={AdminLoginPage} />
                <Route><Redirect href="/" /></Route>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/admin/login"><Redirect href="/admin" /></Route>
            <Route path="/admin" component={AdminHomePage} />
        </Switch>
    );
};
