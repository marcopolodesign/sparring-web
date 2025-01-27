import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Partido = () => {
  const [searchParams] = useSearchParams();
  const idMatch = searchParams.get("idMatch");

  useEffect(() => {
    // Custom scheme URL for deep linking
    const customSchemeUrl = `sparring-app://partido?idMatch=${idMatch}`;
    const fallbackUrl = "https://testflight.apple.com/join/9E5yhzav"; // Updated fallback URL

    // Attempt to redirect to the app
    window.location.href = customSchemeUrl;

    // If the app is not installed, redirect to TestFlight after a timeout
    const timer = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [idMatch]);

  return (
    <div>
      <h1>Redirecting to the App...</h1>
      <p>
        If the redirection does not work,{" "}
        <a href="https://testflight.apple.com/join/9E5yhzav">click here</a> to join the TestFlight.
      </p>
    </div>
  );
};

export default Partido;