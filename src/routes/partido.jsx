import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Partido = () => {
  const [searchParams] = useSearchParams();
  const idMatch = searchParams.get("idMatch");

  useEffect(() => {
    // Construct the custom scheme URL
    const customSchemeUrl = `sparring-app://partido?idMatch=${idMatch}`;
    const fallbackUrl = "https://sparring.com.ar/download"; // Fallback download page

    // Attempt to redirect to the app
    window.location.href = customSchemeUrl;

    // Fallback after a timeout if the app is not installed
    const timer = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [idMatch]);

  return (
    <div>
      <h1>Redirigiendo a la App...</h1>
      <p>
        If you are not redirected automatically, <a href="https://sparring.com.ar/download">click here</a>.
      </p>
    </div>
  );
};

export default Partido;