import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeBurger, } from "../../store/reducers/appReduce";
import { IState } from "../../store/store";

import classes from './header.module.scss'

export default function Header() {

    const burgerValue = useSelector((state:IState) => state.app.burger)
    const routes = useSelector((state:IState) => state.app.routes)

    const dispatch = useDispatch()


    const closeBurger = () => {
        dispatch(changeBurger(false))
    }

    return (
        <div className={`${classes.header} relative xs:z-[10] lg:z-[2]`}>
            <Link to={routes.home}>
                <img src="./img/header/logo.png" alt="" />
            </Link>
            <div className={classes.btns}>
                <Link to={routes.home}>Home</Link>
                <Link to={routes.menu}>Menu</Link>
                <Link to={routes.about}>About us</Link>
                <Link to={routes.order}>Order online</Link>
                <Link to={routes.reservation}>Reservation</Link>
                <Link to={routes.contact}>Contact us</Link>
            </div>
            <div className={classes.cart}>
                <div className="cart_back">
                    <img src="./img/header/cart.svg" alt="" />
                    <div className="cart_back_count">3</div>
                </div>
                <Link to={routes.signup}>
                    <button>Log in</button>
                </Link>
                <div className="ham">
                    <img src="./img/header/burger_logo.svg" alt="" onClick={() => dispatch(changeBurger(true))}/>
                </div>
            </div>
            <div className={`z-[-14] ${classes.burger} ${burgerValue?classes.active:''}`} onClick={closeBurger}>
                <div className={classes.burger_menu}>
                    <Link to={routes.home} className={classes.link} onClick={closeBurger}>Home</Link>
                    <Link to={routes.menu} className={classes.link} onClick={closeBurger}>Menu</Link>
                    <Link to={routes.about} className={classes.link} onClick={closeBurger}>About us</Link>
                    <Link to={routes.order} className={classes.link} onClick={closeBurger}>Order online</Link>
                    <Link to={routes.reservation} className={classes.link} onClick={closeBurger}>Reservation</Link>
                    <Link to={routes.contact} className={classes.link} onClick={closeBurger}>Contact us</Link>
                    <button className={classes.button}>Log in</button>
                </div>
            </div>
        </div>
    )
}
