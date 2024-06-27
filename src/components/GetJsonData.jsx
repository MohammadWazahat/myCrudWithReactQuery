import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./GetJsonData.css";
import { useQuery } from "@tanstack/react-query";

const GetJsonData = () => {
  const fetchData = async () => {
        const resp = await fetch("http://localhost:3030/users");
    return resp.json() ;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["myUsers"],
    queryFn: fetchData,
  });
  // console.log(isLoading)
  // console.log(data)
  // console.log(error)

  if (isLoading) {
    return <h3>loading ...</h3>;
  }

  if (error) {
    return <>
      <h3>error</h3>
      {/* <div>
        <Link to="/">user list</Link>
      </div> */}
    </>;
  }

  // const [myUser, setMyUser] = useState();
  // if (!isLoading) {
  //   setMyUser(myUser);
  //   console.log(myUser);
  // }

  // const a = {
  //   newdata : data ,
  // }
  // console.log(a)

  // console.log(myUser)
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const res = await axios.get("http://localhost:3030/users");
  //     const data = await res.json();
  //     console.log(data)

  //     };
  //     // console.log(fetchData())
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get("http://localhost:3030/users");
  //     setMyUser(res.data);
  //   };
  //   fetchData();
  // }, []);

  // console.log(myUser);

  const handleDelete = (id) => {
    // window.confirm ask for confirmation of deletion
    const confirm = window.confirm("would you like to delete the user");
    if (confirm) {
      axios
        .delete(`http://localhost:3030/users/` + id)
        .then((res) => {
          location.reload(); // reload us to the same page
        })
        .catch((err) => console.log(err));
    }
    console.log(id);
  };

  return (
    <div>
      {/* <div>{data[0].city}</div> */}
      <div className="h-20 text-3xl flex justify-center items-center">
        User List
      </div>
      <div className=" flex justify-end m-4">
        <Link className="link border border-slate-200  " to="/form">
          Add User
        </Link>
      </div>
      <table className="border border-slate-200 flex flex-col gap-4">
        <thead>
          <tr className="headrow border border-slate-200  ">
            <td>index</td>
            <td>first name</td>
            <td>last name</td>
            <td>gender</td>
            <td>city</td>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            data.map((user, index) => {
              return (
                <tr className="bodyrow border border-slate-200 " key={index}>
                  <td>{index + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>

                  <td>
                    <Link
                      className="link border border-slate-200 "
                      to={`/read/` + user.id}
                    >
                      Read
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link border border-slate-200 "
                      to={`/updateForm/` + user.id}
                    >
                      update user
                    </Link>
                  </td>
                  <td>
                    <button
                      className="link"
                      onClick={(e) => handleDelete(user.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GetJsonData;
