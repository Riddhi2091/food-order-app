import { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useState } from "react";

export default function MealItemForm(props) {
  // const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(
      enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 || 
      enteredAmountNumber > 5 
    ) {
      // setAmountIsValid(false)
      // return;
    }
    // console.log("add");
    props.onAddToCart(enteredAmountNumber);
    
  };

  return (
    <form action="/" className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        lable="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: 1,
          defaultValue: "1",
        }}
      />
      <button className={classes.button}>+ Add</button>
      {/* {!amountIsValid && <p>Please enter a valid amount (1-5)</p>} */}
    </form>
  );
}
