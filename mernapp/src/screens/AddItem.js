import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AddItem() {
    const [CategoryName, setCategoryName] = useState();
    const [productName, setProductName] = useState();
    const [image, setImage] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [total, setTotal] = useState();


    // const additemstate = useSelector(state=>state.addReducer)

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("hello1");
        const newitems = {
            CategoryName: CategoryName,
            productName: productName,
            image: image,
            quantity: quantity,
            price: price,
            description: description,
            total: total
        }

        await axios.post('http://localhost:5000/api/additem', newitems)
            .then(response => {
                console.log("Request successful!");
                console.log(response);
                navigate("/");
            })
            .catch(error => {
                alert('enter all the details');
                console.log(error);
            });


        // const response = await fetch(`http://localhost:5000/api/additem`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },

        //     body: JSON.stringify({
        //         CategoryName: CategoryName,
        //         productName: productName,
        //         image: image,
        //         quantity: quantity,
        //         price: price,
        //         description: description,
        //         total: total
        //     }),
        //     mode: 'cors',
        // });

        // console.log("hello");

        // const json = await response.json();
        // console.log("hello");

        // if (!json.success) {
        //     alert('enter valid credentials');
        // } else {
        //     console.log(json);
        //     console.log("Successfully added!");
        //     navigate('/Login');
        // }
    };
    

    //   const onChange = (event) => {
    //     setCredentials({ ...credentials, [event.target.name]: event.target.value });
    //   };

    return (
        <div
        //   style={{
        //     backgroundImage: `url("https://wallpapers.com/images/hd/grocery-items-circular-shape-31er4lglfoaqy7gb.jpg")`,
        //     backgroundSize: 'cover',
        //     height: '100vh',
        //   }}
        >
            <div className="container">
                <form onSubmit={handleSubmit} className="p-3 rounded shadow-sm">
                    <h1>Add a new item</h1>
                    <label  className="form-label">
                        Category
                    </label>
                    <select className="form-control" id="categoryName" value={CategoryName} onChange={(e) => setCategoryName(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="spices">Spices</option>
                        <option value="edible_oil">Edible Oil</option>
                        <option value="dry_fruits">Dry Fruits</option>
                        <option value="flours">Flour</option>
                    </select>

                    <label  className="form-label">
                        Product Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => {
                            setProductName(e.target.value);
                        }}
                    />
                    <label  className="form-label">
                        Add Image URL
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="image url"
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                    />
                    <label className="form-label">
                        Add Net Weight
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Add net weight"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                    />
                    <label  className="form-label">
                        Price
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                    <label  className="form-label">
                        Description
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Add some description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <label  className="form-label">
                        Total Quantity
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter total quantity"
                        value={total}
                        onChange={(e) => {
                            setTotal(e.target.value);
                        }}
                    />

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className="text-center mt-3">
                    </div>
                </form>
            </div>
        </div>
    );
}


