import { DatabaseOutlined, OrderedListOutlined, ShoppingCartOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';

// icons
const icons = {
  DatabaseOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined
};

const pages = {
  id: 'categories',
  title: 'Categories',
  type: 'group',
  children: [
    {
      id: 'categoriesManager',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: icons.OrderedListOutlined
    },
    {
      id: 'productsManager',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'ordersManager',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ShoppingCartOutlined
    },
    {
      id: 'discountManager',
      title: 'Discounts',
      type: 'item',
      url: '/discounts',
      icon: icons.DollarOutlined
    },
    {
      id: 'usersManager',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined
    }
  ]
};

export default pages;
