import { useState } from 'react';

import { Pocketbase as PocketbaseProvider } from 'pocketbase-react';
import { Router } from './pages/_router';

const serverURL = "http://127.0.0.1:8090";
const collections = ['games', 'goals', 'players', 'teams'];
const webRedirectURL = "mariansam.eu/webred";
const mobileRedirectURL = "mariansam.eu/mobred" // for example

const App: React.FC = () => {
    return (
        <PocketbaseProvider
            serverURL={serverURL}
            initialCollections={collections}
            webRedirectUrl={webRedirectURL}
            mobileRedirectUrl={mobileRedirectURL}
            openURL={async (url) => {
                // for example expo WebBrowser
            }}
        >
            <Router />
        </PocketbaseProvider>
    );
};

export default App;
