import axios from "axios";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const AddDataJson = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    city: "",
  });

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/users", values)
      .then((res) => {
        console.log(res);
        // hook to navigate back to the page
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <div>
          <Link to="/">user list</Link>
        </div>
        add data
      </div>

      <h2>i will add data form</h2>

      <form onSubmit={submitForm}>
        <label htmlFor="first_name">Enter First Name</label>
        <br />
        <input
          type="text"
          placeholder="Fisrt name"
          name="first_name"
          onChange={(e) => setValues({ ...values, first_name: e.target.value })}
        />
        <br />
        <label htmlFor="last_name">Enter Last Name</label>
        <br />
        <input
          type="text"
          placeholder="Last name"
          name="last_name"
          onChange={(e) => setValues({ ...values, last_name: e.target.value })}
        />
        <br />
        <label htmlFor="gender">Enter gender</label>
        <br />
        <input
          type="text"
          placeholder="gender"
          name="gender"
          onChange={(e) => setValues({ ...values, gender: e.target.value })}
        />
        <br />
        <label htmlFor="city">Enter city</label>
        <br />
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => setValues({ ...values, city: e.target.value })}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDataJson;
