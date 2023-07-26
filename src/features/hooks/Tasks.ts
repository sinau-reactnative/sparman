import { useRecoilState } from 'recoil'
import { tasksState } from '../TaskAtoms'
import type { Task } from '../../types'
import { TASK_PROGRESS_ID } from '../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  addTask: (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void
  updateTask: (body: Task) => void
  deleteTask: (taskId: number) => void 
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED }
        : task,
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, progressOrder: task.progressOrder+directionNumber }
        : task,
    )
    setTasks(updatedTasks)
  } 

  const addTask = (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (body: Task): void => {
    const updatedTasks: Task[] = tasks.map((task) => (task.id === body.id ? { ...body } : task))
    setTasks(updatedTasks)
  }

  const deleteTask = (taskId: number): void => {
    const findIndex = tasks.findIndex(t=>{
      return t.id === taskId;
    })
  }
  return {
    completeTask,
    moveTaskCard,
    addTask,
    updateTask,
    deleteTask,
  }
}   