import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div className="w-full h-full flex flex-col">
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div className="w-full h-full flex flex-col">
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div className="w-full h-full flex flex-col">
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ]
);

function App() {
  return (
    <div className=' text-cyan-300'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
