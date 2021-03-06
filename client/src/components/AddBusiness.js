import React, { useState } from "react";
import { NotificationManager } from "react-notifications";

const AddBusiness = ({ addBusiness }) => {
    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("none");

    /**
     * Sends a POST request to the API and attempts to add a new Business
     * @param {Event} submission - The event from the Business submission form
     */
    const handleSubmit = async submission => {
        submission.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/businesses", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name === "" ? null : name,
                    location: location === "" ? null : location,
                    price_range: parseInt(priceRange)
                })
            });
            if (response.ok) {
                addBusiness((await response.json()).data.business);
                NotificationManager.success("Successfully Added a Business", "Addition Success");
            } else {
                throw new Error((await response.json()).status);
            }
        } catch (error) {
            console.error(error);
            NotificationManager.error(error.message, "Error", 3000);
        }
    };

    return (
        <div className="m-4">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input
                            value={name} onChange={event => setName(event.target.value)}
                            type="text" className="form-control" placeholder="Name"
                        />
                    </div>
                    <div className="col">
                        <input
                            value={location} onChange={event => setLocation(event.target.value)}
                            type="text" className="form-control" placeholder="Location"
                        />
                    </div>
                    <div className="col">
                        <select
                            value={priceRange}
                            onChange={event => setPriceRange(event.target.value)}
                            name="price-select" id="price-select" className="custom-select"
                        >
                            <option value="none" hidden>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Add Business</button>
                </div>
            </form>
        </div>
    );
}

export default AddBusiness;
