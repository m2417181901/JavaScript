import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import List from '../pages/admin/products/List';
import Edit from '../pages/admin/products/Edit';
import Index from '../pages/notices/Index';
import { AppstoreFilled, ShoppingFilled } from '@ant-design/icons';
export const mainRoutes = [{
        path: '/login',
        element: Login
    },
    {
        path:'/404',
        element: PageNotFound
    },
    {
        path: '/',
        element: Login
    }    
]

// 下面的是必须登录才能看到的
export const adminRoutes = [{
        id:0,
        path: '/products',
        element: List,
        isShow: true,
        title: '看板',
        icon: <AppstoreFilled />
    },
    {
        id:1,
        path: '/list',
        element: List,
        exact: true,
        isShow: true,
        title: '商品管理',
        icon: <ShoppingFilled />
    },
    {
        id:6,
        path:'/products/edit',
        element: Edit,
        isShow: false
    },
    {
        id:2,
        path:'/products/edit/:id/:name/:price',
        element: Edit,
        isShow: false
    },
    {
        id:4,
        path: '/',
        element: List
    }, 
    {
        id:5,
        path: '/notices',
        element: Index,
        isShow: false
    },
    {
        id:3,
        path:'*',
        element: PageNotFound
    },
]
