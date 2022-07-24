import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//for add
const cartReduser = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * 1;
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[exisitingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      console.log(action.item.amount);
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  //for remove
  if (action.type === "REMOVE") {
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingItem = state.items[exisitingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
    if (exisitingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

export default function CartProvider(Props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReduser,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {Props.children}
    </CartContext.Provider>
  );
}
