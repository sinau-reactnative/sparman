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
  // filterTask: (taskOrder: number, taskStatus: string) => void
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
    const lastData = tasks[tasks.length-1]
    const newTask: Task = {
      id: lastData.id+1,
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
    const updatedTasks: Task[] = tasks.filter((task) =>
      task.id !== taskId
    )
    setTasks(updatedTasks)
  }

  // const filterTask = (taskOrder : number, taskStatus : string): void => {
  //   // console.log("FUNCTION FILTER COMPLETED CALLED")
  //   if(taskStatus == "completed"){
  //     const updatedTasks: Task[] = tasks.filter((task) =>
  //      task.progressOrder == taskOrder
  //   )
  //   setTasks(updatedTasks)
  //   } else if(taskStatus == "unCompleted"){
  //     const updatedTasks: Task[] = tasks.filter((task) =>
  //      task.progressOrder !== taskOrder 
  //   )
  //   setTasks(updatedTasks)
  //   } else{
  //     const updatedTasks: Task[] = tasks.filter(() =>
  //     setTasks(updatedTasks)
  //  )
  //   }
    
    
  // }

  return {
    completeTask,
    moveTaskCard,
    addTask,
    updateTask,
    deleteTask,
  }
}   