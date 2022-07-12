import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import routes from './routes';
import config from './config.json';
import DefaultLayout from './components/DefaultLayout';

const socket = io(config.SERVER_URL);

function App() {
    const user = {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        isAdmin: Number(localStorage.getItem('isAdmin')),
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;
                        if (!route.defaultLayout) {
                            return <Route key={index} path={route.path} element={<Page socket={socket} />} />;
                        } else {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <DefaultLayout user={user}>
                                            <Page socket={socket} user={user} />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        }
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
