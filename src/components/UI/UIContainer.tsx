import { useCallback, useRef } from 'react'
import { UIWrapper } from './style'
import UIControls from './UIControls/index.tsx'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import Loading from '@/components/Loading'
import { PageActionType, showGame, showLoad } from '@/store/festures/game.ts'

export default function UIContainer() {
  const { game, load } = useSelector((state:RootState) => state.game)
  const container = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const handleEmit = useCallback((type: PageActionType) => {
    if (type === 'hide-load') {
      dispatch(showLoad({ type: type }))
    }
    if (type === 'show-game') {
      dispatch(showGame({ type: type }))
    }
    // dispatch({ type, payload })
  }, [])
  return (
    <>
      <UIWrapper ref={container}>
        {game && <UIControls/>}
        {load && <Loading emit={handleEmit}/>}
      </UIWrapper>
    </>
  )
}
