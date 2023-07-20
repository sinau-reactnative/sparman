// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
//     </>
//   )
// }

//import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
//import SideMenu from './components/SideMenu'
import SideMenuLayout from './layouts/SideMenuLayout'
import { RecoilRoot } from 'recoil'
import TaskSummary from './features/components/TaskSummary'
import TaskList from './features/components/TaskList/TaskList'
import TaskProgress from './features/components/TaskProgress/TaskProgress'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <SideMenuLayout/>
      </div>
    ),
    children: [
    {
    path: '/',
    element: <TaskSummary />,
    },
    {
    path: 'task-list',
    element: <TaskList />,
    },
    {
    path: 'task-progress',
    element: <TaskProgress />,
    }
    ],
    
  },
])

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
