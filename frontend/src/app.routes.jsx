import {createBrowserRouter} from "react-router"
import Signup from "./features/auth/pages/Signup.jsx"
import Login from "./features/auth/pages/Login.jsx"
import Home from "./components/Home.jsx"
import Organizations from "./features/trello_space/pages/Organizations.jsx"
import Organization from "./features/trello_space/pages/Organization.jsx"
import Boards from "./features/trello_space/pages/Boards.jsx"
import Issues from "./features/trello_space/pages/Issues.jsx"
import NotProtected from "./features/auth/components/NotProtected.jsx"
import Protected from "./features/auth/components/Protected.jsx"

export const routes = createBrowserRouter([
        {
                path:'/signup',
                element:<NotProtected>
                        <Signup />
                </NotProtected>

        },
        {
                path:'/login',
                 element:<NotProtected>
                        <Login />
                </NotProtected>
        },
        {
                path:'/',
                 element:<NotProtected>
                        <Home />
                </NotProtected>
        },
        {
                path:'/organizations',
                 element:<Protected>
                        <Organizations />
                </Protected>
        },
        {
                path:'/organizations/:organizationId',
                 element:<Protected>
                        <Organization />
                </Protected>
        },
        {
                path:'/organizations/:organizationId/boards',
                 element:<Protected>
                        <Boards />
                </Protected>
        },
        {
                path:'/organizations/:organizationId/:boardId/issues',
                 element:<Protected>
                        <Issues />
                </Protected>
        },

])