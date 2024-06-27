import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const UpdateData = () => {
  const { id } = useParams();
  // console.log(id);

  const users = {
    first_name: "A",
    last_name: "B",
    gender: "C",
    city: "D",
  };
  const [user, setUser] = useState(users);
  // console.log(user);

  const inputChangeHandler = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const mutation = useMutation({
    mutationFn: (x) => {
      console.log(x);
      return axios.put(`http://localhost:3030/users/` + id, x);
    },
  });

  const fetchData = async () => {
    const resp = await fetch(`http://localhost:3030/users/` + id);
    return resp.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["myUser", id],
    queryFn: fetchData,
  });
  // console.log(isLoading)
  // console.log(data);
  // console.log(error)

  if (isLoading) {
    return <h3>loading ...</h3>;
  }

  if (error) {
    return <h3>error</h3>;
  }

  const handleSubmit = () => {
    mutation.mutate({
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      city: user.city,
    });
  };









  // const { id } = useParams();
  // Create api

  // const navigate = useNavigate();
  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   // await axios.patch(`http://localhost:3030/users/` + id, user);
  //   // navigate("/");
  // };

  // useEffect(() => {
  //   axios.get(`http://localhost:3030/users/` + id).then((res) => {
  //     setUser(res.data);
  //   });
  // }, [id]);

  return (
    <div>
      <div>
        <Link to="/">user list</Link>
      </div>
      <h2>Update your form</h2>
      <div>
        {/* <form onSubmit={submitForm}> */}
        <form>
          <label htmlFor="first_name">Enter First Name</label>
          <br />
          <input
            type="text"
            placeholder="Fisrt name"
            name="first_name"
            // value={user.first_name}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="last_name">Enter Last Name</label>
          <br />
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            // value={data.last_name}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="gender">Enter gender</label>
          <br />
          <input
            type="text"
            placeholder="gender"
            name="gender"
            // value={data.gender}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="city">Enter city</label>
          <br />
          <input
            type="text"
            placeholder="city"
            name="city"
            // value={data.city}
            onChange={inputChangeHandler}
          />
          <br />
          <button type="submit" onClick={handleSubmit}>
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
