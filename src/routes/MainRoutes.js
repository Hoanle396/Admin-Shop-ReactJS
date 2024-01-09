import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import CreateCategory from 'pages/categories/create-category';
import EditCategory from 'pages/categories/edit-category';
import Categories from 'pages/categories/index';
import ComponentColor from 'pages/components-overview/Color';
import CreateDiscounts from 'pages/discounts/create';
import DiscountsPage from 'pages/discounts/index';
import OrdersPage from 'pages/orders/index';
import OrderDetail from 'pages/orders/order-detail';
import Create from 'pages/products/create';
import ProductsPage from 'pages/products/index';
import UsersPage from 'pages/users/index';
import Update from 'pages/users/update';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'categories',
      children: [
        {
          path: '',
          element: <Categories />
        },
        {
          path: 'new',
          element: <CreateCategory />
        },
        {
          path: ':id',
          element: <EditCategory />
        }
      ]
    },
    {
      path: 'products',
      children: [
        {
          path: '',
          element: <ProductsPage />
        },
        {
          path: 'new',
          element: <Create />
        }
      ]
    },
    {
      path: 'orders',
      children: [
        {
          path: '',
          element: <OrdersPage />
        },
        {
          path: ':id',
          element: <OrderDetail />
        }
      ]
    },
    {
      path: 'discounts',
      children: [
        {
          path: '',
          element: <DiscountsPage />
        },
        {
          path: 'new',
          element: <CreateDiscounts />
        }
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: '',
          element: <UsersPage />
        },
        {
          path: ':id',
          element: <Update />
        }
      ]
    },
    {
      path: '*',
      element: <ComponentColor />
    }
  ]
};

export default MainRoutes;
