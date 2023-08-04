import { atom } from 'recoil'
import type { Modal, Menu, Task } from '../types'
import { AtomKeys } from '../constants/recoilKeys'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../constants/app'

export const menuState = atom<Menu>({
  key: AtomKeys.MENU,
  default: { menuOpenId: 0 },
})

export const modalState = atom<Modal>({
  key: AtomKeys.MODAL,
  default: {
    isOpen: false,
    type: TASK_MODAL_TYPE.ADD,
    defaultProgress: TASK_PROGRESS_ID.NOT_STARTED,
    task: {} as Task,
  },
})
