import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./GetJsonData.css";
import { useMutation, useQuery } from "@tanstack/react-query";

const GetJsonData = () => {
  const mutation = useMutation({
    mutationFn: (x) => {
      console.log(x);
      const confirm = window.confirm("would you like to delete the user");
      if (confirm) {
        return axios
          .delete(`http://localhost:3030/users/` + x)
          .then((res) => {
            location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
  });

  const fetchData = async () => {
    const resp = await fetch("http://localhost:3030/users");
    return resp.json();
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
    return <h3>error</h3>;
  }

  const handleDelete = (x) => {
    console.log(x);
    mutation.mutate(x);
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
