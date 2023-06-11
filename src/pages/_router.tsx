import React from 'react';
import { Route, Switch } from "wouter";
import { HomePage } from './home';
import { BufetPage } from './bufet';
import { TeamsPage } from './teams';
import { AdminHomePage } from './admin/home';
import { GamesPage } from './games';
import { AdminRouter } from './admin/_router';
import { VotingPage } from './voting';
import { TablePage } from './table';

export const Router: React.FC = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/bufet" component={BufetPage} />
            <Route path="/teams" component={TeamsPage} />
            <Route path="/games" component={GamesPage} />
            <Route path="/voting" component={VotingPage} />
            <Route path="/table" component={TablePage} />

            <Route path="/admin" component={AdminRouter} />
            <Route path="/admin/:rest" component={AdminRouter} />
        </Switch>
    );
};
