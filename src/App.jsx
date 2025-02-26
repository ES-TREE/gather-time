import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

// 라우팅
import routes from "./routes"

import { Toaster } from "react-hot-toast"
import Header from "./components/app/Header"

export default function App() {
  return (
    <Router>
      <div className="fixed left-0 top-0 flex w-full items-center justify-center border-b bg-white">
        <Header />
      </div>
      <main className="m-auto mt-14 max-w-screen-sm bg-white p-5">
        <Routes>
          {routes.map(({ id, path, element }) => (
            <Route key={`page-${id}`} path={path} element={element} />
          ))}
        </Routes>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </main>
    </Router>
  )
}
