import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

        //logic of all input
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

export default function Checkout(props) {
    const [formInputsValidity,setFormInputsValidity] = useState({
      name:true,
      street:true,
      city:true,
      postalCode:true
    })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  //submit handler
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostCodeIsValid = isFiveChars(enteredPostCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostCodeIsValid;

    if(!formIsValid){
      return;
    }
    //Submit cart detail
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostCode
    });
  };
        //for error design
  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid }`
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid }`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid }`
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid }`

  return (
    <form onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name !</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && <p>Please enter a valid street !</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef}></input>
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postalCode (5 characters long) !</p>
        )}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city !</p>}
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
}
