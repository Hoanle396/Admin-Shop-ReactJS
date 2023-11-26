import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import CreateCategory from 'pages/categories/create-category';
import Categories from 'pages/categories/index';
import ComponentColor from 'pages/components-overview/Color';
import Create from 'pages/products/create';
import ProductsPage from 'pages/products/index';
import OrdersPage from 'pages/orders/index';
import UsersPage from 'pages/users/index';
import DiscountsPage from 'pages/discounts/index';

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
          element: <Create />
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
          path: 'new',
          element: <Create />
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
