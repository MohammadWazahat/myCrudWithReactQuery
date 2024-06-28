import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ReadSingleData = () => {
  const { id } = useParams();
  // console.log(id);
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

  return (
    <div>
      <div>
        <Link to="/">user list</Link>
      </div>
      <div>{data.first_name}</div>
      <div>{data.last_name}</div>
      <div>{data.gender}</div>
      <div>{data.city}</div>
    </div>
  );
};

export default ReadSingleData;
