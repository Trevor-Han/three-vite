import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Router from './index.tsx'
import { useDispatch } from 'react-redux'
import { checkKeyPath } from '@/store/festures/theme.ts'
type Route = {
    path: string;
    name?: string | undefined;
};

export const RouterBeforeEach = ({ children }: any) => {
  const location = useLocation()
  const dispatch = useDispatch()
  // const navigator = useNavigate()
  useEffect(() => {
    const router = getCurrentRouterMap(Router, location.pathname)
    const name = router.name as string
    dispatch(checkKeyPath([name]))
    // const { auth } = router
    // if (auth) {
    //   // navigator('/login')
    // }
  }, [location.pathname])
  return children
}
const getCurrentRouterMap = (routers: any, path: string): Route => {
  for (const router of routers) {
    if (router.path === path) return router
    if (router.child) {
      const childRouter = getCurrentRouterMap(router.child, path)
      if (childRouter) return childRouter
    }
  }
  return Router[Router.length - 1]
}
