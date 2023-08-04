import { useRecoilState } from 'recoil'
import { Menu, Modal } from '../../types'
import { menuState, modalState } from '../GlobalAtom'

interface useGlobalActionType {
  updateMenu: (menuOpenId: number) => void
  updateModal: (body: Modal) => void
}

export const useGlobalAction = (): useGlobalActionType => {
  const [modal, setModal] = useRecoilState<Modal>(modalState)
  const [menu, setMenu] = useRecoilState<Menu>(menuState)

  const updateMenu = (menuOpenId: number): void => {
    setMenu({ menuOpenId })
  }

  const updateModal = (body: Modal): void => {
    setModal({ ...body })
  }

  return {
    updateModal,
    updateMenu,
  }
}
