import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./components/Home"
import Camera from "./components/Camera"
import Library  from "./components/Library"

export default function App() {
  return (
      <main className="flex flex-row gap-4 h-[100vh] p-3 bg-primary">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Camera" element={<Camera />} />
          <Route path="/Library" element={<Library />} />
        </Routes>
      </main>
  )
}