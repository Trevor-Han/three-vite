// import { Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import fullSceneRouter from '@/router/fullSceneRouter'
import { ConfigProvider, theme } from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import 'antd/dist/reset.css'
import '@/assets/styles/main.css'
import '@/assets/styles/responsive.css'

function FullScene() {
  return <div>
    {useRoutes(fullSceneRouter)}
  </div>
}
function MainScene() {
  return <div className='main'>Antd</div>
}

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const { algorithm } = useSelector((state:RootState) => state.theme)
  const location = useLocation()
  const pathNameList = fullSceneRouter.map(item => item.path)

  return <div className='App'>
    <ConfigProvider theme={{ algorithm: algorithm === 'light' ? defaultAlgorithm : darkAlgorithm }}>\
      {pathNameList.includes(location.pathname) ? <FullScene /> : <MainScene />}
    </ConfigProvider>
  </div>
}

export default App

