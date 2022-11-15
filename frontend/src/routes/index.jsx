import path from '../config/path';
import { Home,Test } from '../pages';
import { MainLayout } from '../layout';

const routes = [
    { path: path.home,page: Home,layout: MainLayout },
    { path: path.test,page: Test,layout: MainLayout },
    { path: path.myMusic,page: Test,layout: MainLayout },
    { path: path.radio,page: Test,layout: MainLayout },
    { path: path.zingChart,page: Test,layout: MainLayout },
    { path: path.follow,page: Test,layout: MainLayout },
]

export {
    routes
};