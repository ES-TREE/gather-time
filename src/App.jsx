import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

// 라우팅
import Header from "./components/app/Header"
import routes from "./routes"

export default function App() {
  return (
    <Router>
      <div className="flex items-center justify-center border-b bg-white">
        <Header />
      </div>
      <main className="m-auto max-w-screen-sm bg-white p-5">
        <Routes>
          {routes.map(({ id, path, element }) => (
            <Route key={`page-${id}`} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </Router>
  )
}
