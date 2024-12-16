import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { changeBurger, } from "../../store/reducers/appReduce";
import { useAppSelector } from "../../store/store";

import classes from './header.module.scss'

export default function Header() {

    const burgerValue = useAppSelector(s => s.app.burger)
    const routes = useAppSelector(s => s.app.routes)
    const userData = useAppSelector(s => s.user)
    const cartValue = useAppSelector(s => s.order.cart)

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
                {userData.uid!==null&&
                    <Link to={routes.order}>
                        <div className="cart_back cursor-pointer">
                            <img src="./img/header/cart.svg" alt="" />
                            {cartValue.length>0&&<div className="cart_back_count">{cartValue.length}</div>}
                        </div>
                    </Link>
                }
                {userData.uid===null&&
                    <Link to={routes.signup}>
                        <button>Log in</button>
                    </Link>
                }
                {userData.uid!==null&&
                    <Link to={routes.profile}>
                        <img className="xs:hidden lg:flex cursor-pointer w-[40px] h-[40px] rounded-full" src="./img/profile/profile.png" alt="" />
                    </Link>
                }
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
                    {userData.uid===null?
                    <Link to={routes.signup} className={classes.button} onClick={closeBurger}>Log in</Link>:
                    <Link to={routes.signup} className={classes.link} onClick={closeBurger}>Profile</Link>}
                </div>
            </div>
        </div>
    )
}
