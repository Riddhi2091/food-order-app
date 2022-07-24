import classes from "./AvailableMeals.module.css";
import Card from '../UI/Card'
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [
      {
        id: "m1",
        name: "Sushi",
        description: "Finest fish and veggies",
        price: 22.99,
      },
      {
        id: "m2",
        name: "Sendwich",
        description: "onion,chiess,tomato,potato!",
        price: 16.5,
      },
      {
        id: "m3",
        name: "Barbecue Burger",
        description: "American, raw, meaty",
        price: 12.99,
      },
      {
        id: "m4",
        name: "Green Bowl",
        description: "Healthy...and green...",
        price: 18.99,
      },
    ];

export default function AvailableMeals() {

    const [meals,setMeals] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const [httpError,setHttpError] = useState()

    

    // useEffect(() => {
    //   const fetchMeal = async () => {
    //     const response = await fetch(
    //       "https://react-http-ae00f-default-rtdb.firebaseio.com/meals.json"
    //     );

    //     if(!response.ok) {
    //       throw new Error('Something went wrong');
    //     }
    //     const responseData = await response.json();

    //     const loadMeals = [];

    //     for(const key in responseData) {
    //       loadMeals.push({
    //         id: key,
    //         name: responseData[key].name,
    //         description: responseData[key].description,
    //         price: responseData[key].price,
    //       });
    //     }
    //     setMeals(loadMeals);
    //     setIsLoading(false)
    //   }

    //   fetchMeal().catch((error => {
    //     setIsLoading(false)
    //     setHttpError(error.message)
    //   }))
      
    // },[]);
    
    // if(isLoading) {
    //   return (
    //     <section className={classes.loading}>Loading.....</section>
    //   )
    // }

    if(httpError){
      return (
        <section className={classes.mealsError}>
          <p>{httpError}</p>
        </section>
      )
    }

const mealList =
  DUMMY_MEALS &&
  DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealList}
        </ul>
      </Card>
    </section>
  );
}
