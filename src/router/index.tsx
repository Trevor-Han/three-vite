import { ReactNode } from 'react'
// import ErrorBoundary from '@/components/ErrorBoundary'
import NotFound from '@/components/NotFound'

interface Route {
  path: string,
  name?: string,
  element: ReactNode | null,
  children?: Route[],
  errorElement?: ReactNode | null;
  auth?: boolean
}
const Router: Array<Route> = [
  { path: '*', element: <NotFound />, auth: true, name: '' }
]
export default Router
