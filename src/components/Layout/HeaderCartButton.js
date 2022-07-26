import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/CartContext";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'

export default function HeaderCartButton(props) {
  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false)

  const cartCtx = useContext(CartContext)
  const numberOfCartItem = cartCtx.items.reduce((curNumber,item)=>{
    return curNumber +item.amount
  },0);
  
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

  useEffect(() => {
    if(cartCtx.length === 0){
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(()=> {
      setBtnIsHighlighted(false)
    },300)
    return () => {
      clearTimeout(timer)
    }
  },[cartCtx])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
}
