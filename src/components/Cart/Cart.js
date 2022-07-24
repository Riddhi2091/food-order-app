import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout,setIsCheckout] = useState(false); 

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = (userData) => {
    fetch("https://react-http-ae00f-default-rtdb.firebaseio.com/orders.json",{
      method: 'POST',
      body:JSON.stringify({
        user: userData,
        orderedItems:cartCtx.items
      })
    });
  }

  const CartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        /* <li>{item.name}</li> */
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  // console.log(totalAmount);

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {CartItems}
      <div className={classes.total}>
        <span>Total AMount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel={props.onHideCart} />}
      {!isCheckout && modalAction}
    </Modal>
  );
}
