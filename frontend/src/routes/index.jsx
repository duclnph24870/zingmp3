import path from '../config/path';
import { MainLayout } from '../layout';
import { lazy } from 'react';

const routes = [
    { path: path.home,page: lazy(() => import('../pages/Home')),layout: MainLayout },
    { path: path.myMusic,page: lazy(() => import('../pages/MyMusic')),layout: MainLayout }
]

export {
    routes
};