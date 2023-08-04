export interface CSSProperties {
  [key: string]: React.CSSProperties
}

export interface Task {
  id: number
  title: string
  detail: string
  dueDate: string
  progressOrder: number
}

export interface Modal {
  isOpen: boolean
  type: string
  defaultProgress: number
  task: Task
}
export interface Menu {
  menuOpenId: number
}
