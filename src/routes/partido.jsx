import React from "react";
import { useSearchParams } from "react-router-dom";

const Partido = () => {
  const [searchParams] = useSearchParams();
  const idMatch = searchParams.get("idMatch");

  return (
    <div>
      <h1>Match Details</h1>
      <p>Match ID: {idMatch}</p>
    </div>
  );
};

export default Partido;