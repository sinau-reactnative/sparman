import { useState } from 'react'
import type { CSSProperties, Task } from '../../../types'
import { TASK_MODAL_TYPE } from '../../../constants/app'
import TaskModal from './TaskModal'
import { useTasksAction } from '../../hooks/Tasks'
import { useGlobalAction } from '../../hooks/Global'

interface TaskMenuProps {
  task: Task
}

const TaskMenu = ({ task }: TaskMenuProps): JSX.Element => {
  const { updateMenu } = useGlobalAction()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [type, setType] = useState<string>(TASK_MODAL_TYPE.ADD)
  const { deleteTask } = useTasksAction()

  return (
    <div style={styles.menu}>
      <div
        style={styles.menuItem}
        onClick={(): void => {
          setType(TASK_MODAL_TYPE.EDIT)
          setIsModalOpen(true) // Ditambahkan
        }}
      >
        <span className="material-icons">edit</span>Edit
      </div>
      <div
        style={styles.menuItem}
        onClick={(): void => {
          deleteTask(task.id) // Ditambahkan
        }}
      >
        <span className="material-icons">delete</span>Delete
      </div>
      <span
        className="material-icons"
        style={styles.closeIcon}
        onClick={(): void => {
          updateMenu(0)
        }}
      >
        close
      </span>
      {isModalOpen && (
        <TaskModal
          headingTitle={type === TASK_MODAL_TYPE.ADD ? 'Add your task' : 'Edit your task'}
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={task.progressOrder}
          selectedData={task}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '-10px',
    right: '4%',
    zIndex: 10,
  },
  menuItem: {
    display: 'flex',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '2px',
    cursor: 'pointer',
  },
}

export default TaskMenu
