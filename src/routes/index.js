import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

import AddUser from '../pages/AddUser';
import ListUser from '../pages/ListUser';

import ListFile from '../pages/ListFile';

import AddUnit from '../pages/AddUnit';

import Sign from '../pages/Sign';
import AddFile from '../pages/AddFile';

const routes = [
    { path: '/', component: Home, defaultLayout: true },
    { path: '/login', component: Login, defaultLayout: false },
    { path: '/register', component: Register, defaultLayout: false },

    { path: '/unit/add-user', component: AddUser, defaultLayout: true },
    { path: '/unit/list-user', component: ListUser, defaultLayout: true },

    { path: '/unit/add-file', component: AddFile, defaultLayout: true },
    { path: '/unit/list-file', component: ListFile, defaultLayout: true },

    { path: '/unit/add-unit', component: AddUnit, defaultLayout: true },

    { path: '/sign/sign/:id', component: Sign, defaultLayout: true },
];

export default routes;
