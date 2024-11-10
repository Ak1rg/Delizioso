import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeBurger, IDishesState } from "../../store/reducers/dishesReduce";

import classes from './header.module.scss'

export default function Header() {

    const burgerValue = useSelector((state:{dishes:IDishesState}) => state.dishes.burger)

    const dispatch = useDispatch()


    const closeBurger = () => {
        dispatch(changeBurger(false))
    }

    return (
        <div className={classes.header}>
            <Link to='/'>
                <img src="./img/header/logo.png" alt="" />
            </Link>
            <div className={classes.btns}>
                <Link to='/'>Home</Link>
                <Link to='/'>Menu</Link>
                <Link to='/'>About us</Link>
                <Link to='/'>Order online</Link>
                <Link to='/'>Reservation</Link>
                <Link to='/'>Contact us</Link>
            </div>
            <div className={classes.cart}>
                <div className="cart_back">
                    <img src="./img/header/cart.svg" alt="" />
                    <div className="cart_back_count">3</div>
                </div>
                <button>Log in</button>
                <div className="ham">
                    <img src="./img/header/burger_logo.svg" alt="" onClick={() => dispatch(changeBurger(true))}/>
                </div>
            </div>
            <div className={`${classes.burger} ${burgerValue?classes.active:''}`} onClick={closeBurger}>
                <div className={classes.burger_menu}>
                    <Link to="/" className={classes.link} onClick={closeBurger}>Home</Link>
                    <Link to="/" className={classes.link} onClick={closeBurger}>Menu</Link>
                    <Link to="/" className={classes.link} onClick={closeBurger}>About us</Link>
                    <Link to="/" className={classes.link} onClick={closeBurger}>Order online</Link>
                    <Link to="/" className={classes.link} onClick={closeBurger}>Reservation</Link>
                    <Link to="/" className={classes.link} onClick={closeBurger}>Contact us</Link>
                    <button className={classes.button}>Log in</button>
                </div>
            </div>
        </div>
    )
}
