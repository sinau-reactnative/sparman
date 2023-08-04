import React, { useState } from 'react'
import type { Task, CSSProperties } from '../../../types'
import { TASK_PROGRESS_ID } from '../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
//import TaskModal from '../shared/TaskModal'
import TaskMenu from '../shared/TaskMenu'
import { useGlobalAction } from '../../hooks/Global'
import { useRecoilValue } from 'recoil'
import { menuState } from '../../GlobalAtom'

interface TaskCardProps {
  task: Task
}

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5'

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer'

  return {
    color,
    cursor,
    fontSize: '28px',
  }
}

const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
  const justifyContentValue: 'flex-end' | 'space-between' =
    progressOrder === TASK_PROGRESS_ID.NOT_STARTED ? 'flex-end' : 'space-between'
  return {
    display: 'flex',
    justifyContent: justifyContentValue,
  }
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const { completeTask, moveTaskCard } = useTasksAction()
  const { updateMenu } = useGlobalAction()
  const menu = useRecoilValue(menuState)

  return (
    <div style={styles.taskCard}>
      <div style={styles.taskIcons}>
        <div
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={(): void => {
            completeTask(task.id)
          }}
        >
          check_circle
        </div>
        <div
          className="material-icons"
          style={styles.menuIcon}
          onClick={(): void => {
            updateMenu(task.id)
          }}
        >
          more_vert
        </div>
      </div>
      <p style={styles.taskTitle}>{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div style={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button
            className="material-icons"
            onClick={(): void => {
              moveTaskCard(task.id, -1)
            }}
          >
            chevron_left
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button
            className="material-icons"
            onClick={(): void => {
              moveTaskCard(task.id, 1)
            }}
          >
            chevron_right
          </button>
        )}
      </div>
      {menu.menuOpenId === task.id && <TaskMenu task={task} />}
    </div>
  )
}

const styles: CSSProperties = {
  taskCard: {
    backgroundColor: '#C7EFD0',
    borderRadius: '12px',
    padding: '24px',
    margin: '12px 0',
    fontSize: '20px',
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  taskIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  taskTitle: {
    fontSize: '30px',
  },
  arrowsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default TaskCard
