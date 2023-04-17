import path from '../config/path';
import { lazy } from 'react';

const MainLayout = lazy(() => import('../layout/MainLayout'))

const routes = [
    { path: path.home,page: lazy(() => import('../pages/Home')),layout: MainLayout },
    { path: path.myMusic,page: lazy(() => import('../pages/MyMusic')),layout: MainLayout }
]

export {
    routes
};