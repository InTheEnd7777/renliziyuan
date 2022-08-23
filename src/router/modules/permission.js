import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: {
    id: 'permissions', // 用来和后端权限做约定的
  },
  children: [
    {
      name:'permissions',
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: 'permission', icon: 'lock' },
    },
  ],
}
