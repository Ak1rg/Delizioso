import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/header"
import Home from "./pages/Home"
import { useDispatch, useSelector } from "react-redux"
import { IState } from "./store/store"
import Menu from "./pages/Menu"
import ScrollToTop from "./components/scrollToTop/ScrollToTop"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Mail from "./components/mail/Mail"
import Reservation from "./pages/Reservation"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"
import { closeReservation } from "./store/reducers/reservationReduce"
import Order from "./pages/Order"
import Checkout from "./pages/Checkout"
import axios from "axios"
import { setUser } from "./store/reducers/userReduce"
import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [previousPath, setPreviousPath] = useState<string>('')
  const routes = useSelector((state:IState) => state.app.routes)
  const location = useLocation();
  const hideHeaderFooter = location.pathname === routes.signup;

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionCookie = document.cookie.includes('session');
        if (!sessionCookie) {
          return; 
        }
        const response = await axios.get('/Delizioso/api/check-session', {
          withCredentials: true, 
        });
        if (response.status === 200) {
          const user = response.data.user;
          const userData = await getDoc(doc(db, "users", user.uid));
          dispatch(setUser({ ...userData.data() }));
        }
        if (location.pathname === routes.signup) {
          navigate(routes.profile);
        }
      } catch (error) {
        console.error('No valid session or error occurred:', error);
      }
    };
  
    checkSession();
  }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            if (previousPath === routes.reservation && location.pathname !== routes.reservation) {
                dispatch(closeReservation())
            }
            setPreviousPath(location.pathname)
        };
        handleRouteChange();
    }, [previousPath,location,dispatch,routes]);


  return (
    <>
      {!hideHeaderFooter && <Header/>}
      <Routes>
        <Route path={routes.home} element={<Home/>}/>
        <Route path={routes.menu} element={<Menu/>}/>
        <Route path={routes.about} element={<About/>}/>
        <Route path={routes.contact} element={<Contact/>}/>
        <Route path={routes.reservation} element={<Reservation/>}/>
        <Route path={routes.order} element={<Order/>}/>
        <Route path={routes.checkout} element={<Checkout/>}/>
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
