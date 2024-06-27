import { useMutation } from "@tanstack/react-query";
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

  const handleSubmit = () => {
    mutation.mutate({
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      city: values.city,
    });
  };

  const mutation = useMutation({
    mutationFn: (x) => {
      console.log(x);
      return axios.post(`http://localhost:3030/users/`, x);
    },
  });

  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    // hook to navigate back to the page
    navigate("/");
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
        {/* <form> */}
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
        <button type="submit" onClick={handleSubmit}>
          Add user
        </button>
      </form>
    </div>
  );
};

export default AddDataJson;
