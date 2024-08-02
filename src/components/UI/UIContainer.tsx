import { useRef } from 'react'
import { UIWrapper } from './style'
import UIControls from './UIControls/index.tsx'

export default function UIContainer() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <>
      <UIWrapper ref={container}>
        <UIControls/>
      </UIWrapper>
    </>
  )
}
