import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import AddRestaurant from "../components/AddRestaurant";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    // const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurant = restaurant => {
        setRestaurants([...restaurants, restaurant]);
    };

    const deleteRestaurant = async (restaurantID, event) => {
        event.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${restaurantID}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantID));
                NotificationManager.success("Successfully Deleted a Restaurant",
                    "Deletion Success");
            } else {
                throw new Error((await response.json()).status);
            }
        } catch (error) {
            console.error(error);
            NotificationManager.error(error.message, "Error", 3000);
        }
    };

    // Only fetches Restaurant List on component mounting
    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/restaurants");
                if (response.ok) {
                    setRestaurants((await response.json()).data.restaurants);
                } else {
                    throw new Error((await response.json()).status)
                }
            } catch (error) {
                console.error(error);
                NotificationManager.error("Could not retrieve Restaurants. Please Refresh",
                    "Major Error", 5000);
            }
        }
        getRestaurants();
    }, []);

    return (
        <>
            <Header/>
            <AddRestaurant addRestaurant={addRestaurant}/>
            <RestaurantList restaurants={restaurants} deleteRestaurant={deleteRestaurant}/>
        </>
    );
};

export default Home;