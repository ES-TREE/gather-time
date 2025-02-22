import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

// 라우팅
import routes from "./routes"

export default function App() {
  return (
    <Router>
      <main>
        <Routes>
          {routes.map(({ id, path, element }) => (
            <Route key={`page-${id}`} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </Router>
  )
}
