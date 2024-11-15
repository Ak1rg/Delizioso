import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/header"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import { IState } from "./store/store"
import Menu from "./pages/Menu"
import ScrollToTop from "./components/scrollToTop/ScrollToTop"
import About from "./pages/About"

function App() {

  const routes = useSelector((state:IState) => state.app.routes)

  return (
    <>
      <Header/>
      <Routes>
        <Route path={routes.home} element={<Home/>}/>
        <Route path={routes.menu} element={<Menu/>}/>
        <Route path={routes.about} element={<About/>}/>
      </Routes>
      <Footer/>

      <ScrollToTop/>
    </>
  )
}

export default App
