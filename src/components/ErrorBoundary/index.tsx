import { useRouteError } from 'react-router-dom'

export default function Index() {
  const error = useRouteError()

  return <>错误页面 {error} </>
}
