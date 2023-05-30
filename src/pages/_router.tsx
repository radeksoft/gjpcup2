import React from 'react';
import { Route, Switch } from "wouter";
import { HomePage } from './home';

export const Router: React.FC = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
        </Switch>
    );
};
