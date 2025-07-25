import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <div className="px-10 py-4 gra">
        {/* Header */}
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="px-10 py-6 text-sm text-gray-400 border-t border-gray-800 text-center">
        © {new Date().getFullYear()} ZifHub · All rights reserved. Made with  ❤️ by Eswar
      </footer>
    </div>
  )
}

export default AppLayout
