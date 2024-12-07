import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/header"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import { IState } from "./store/store"
import Menu from "./pages/Menu"
import ScrollToTop from "./components/scrollToTop/ScrollToTop"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Mail from "./components/mail/Mail"
import Reservation from "./pages/Reservation"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
// import { useEffect } from "react"
// import Cookies from 'js-cookie';
// import { setUser } from "./store/reducers/userReduce"
// import { doc, getDoc } from "firebase/firestore"
// import { db } from "./firebase"
// import { getAuth, signInWithCustomToken } from "firebase/auth"

function App() {

  // const dispatch = useDispatch()
  const routes = useSelector((state:IState) => state.app.routes)
  const location = useLocation();
  const hideHeaderFooter = location.pathname === routes.signup;

  // const getUser = async () => {
  //   const firebaseToken = Cookies.get('firebaseToken');
  //   if(firebaseToken){
  //     const auth = getAuth();
  //     signInWithCustomToken(auth,firebaseToken)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         console.log(user)
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       });
  //   }
  // }


  return (
    <>
      {!hideHeaderFooter && <Header/>}
      <Routes>
        <Route path={routes.home} element={<Home/>}/>
        <Route path={routes.menu} element={<Menu/>}/>
        <Route path={routes.about} element={<About/>}/>
        <Route path={routes.contact} element={<Contact/>}/>
        <Route path={routes.reservation} element={<Reservation/>}/>
        <Route path={routes.signup} element={<Signup/>}/>
        <Route path={routes.profile} element={<Profile/>}/>
      </Routes>
      {!hideHeaderFooter && <Footer/>}

      <ScrollToTop/>
      <Mail/>
    </>
  )
}

export default App
