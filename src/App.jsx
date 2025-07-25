import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import AppLayout from "./layout/app-layout"
import Category from "./pages/category"
import SearchPage from "./pages/search"
import Favorites from "./pages/favorites"
import Home from "./pages/home"
import GifProvider from "./context/context"
import GifPage from "./pages/single-gif"


// home page
// categories
//search
//single gif
// favorites

const  router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',

        element:<Home/>,
      },
      {
        path:'/:category',

        element:<Category/>,
      },
      {
        path:'/search/:query',

        element:<SearchPage/>,
      },
      {
        path:'/:type/:slug',

        element:<GifPage/>,
      },
      {
        path:'/favorites',

        element:<Favorites/>,
      },
    ]
  }
])
const App = () => {
 return <GifProvider>
 <RouterProvider router={router}/>
 </GifProvider>
}

export default App