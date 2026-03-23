import { RouterProvider } from "react-router"
import { routes } from "./app.routes"
import Header from "./components/Header.jsx"
import { AuthProvider } from './features/auth/auth.context.jsx'
import { TrelloSpaceProvider } from "./features/trello_space/trellospace.context.jsx"
const App = () => {
        return (
                <AuthProvider>
                        <Header />
                        <TrelloSpaceProvider>
                                <RouterProvider router={routes} />
                         </TrelloSpaceProvider>
                </AuthProvider>
        )
}

export default App