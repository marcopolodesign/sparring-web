import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Partido = () => {
  const [searchParams] = useSearchParams();
  const idMatch = searchParams.get("idMatch");

  return (
    <div style={styles.container}>
      <h1>Open Sparring App</h1>
      <p>If the app did not open, <a href={`sparring-app://partido?idMatch=${idMatch}`}>click here</a>.</p>
      <p>If your app is not instlled, please <a href="https://testflight.apple.com/join/9E5yhzav">Download on TestFlight</a></p>

    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" }
};

export default Partido;

// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// const Partido = () => {
//   const [searchParams] = useSearchParams();
//   const idMatch = searchParams.get("idMatch");

//   // useEffect(() => {
//   //   // Custom scheme URL for deep linking
//   //   const customSchemeUrl = `sparring-app://partido?idMatch=${idMatch}`;
//   //   const fallbackUrl = "https://testflight.apple.com/join/9E5yhzav"; // Updated fallback URL

//   //   // Attempt to redirect to the app
//   //   window.location.href = customSchemeUrl;

//   //   // If the app is not installed, redirect to TestFlight after a timeout
//   //   const timer = setTimeout(() => {
//   //     window.location.href = fallbackUrl;
//   //   }, 2000);

//   //   return () => clearTimeout(timer); // Clean up the timer
//   // }, [idMatch]);

//   return (
//     <div>
//       <h1>Redirecting to the App...</h1>
//       <p>
//         If the redirection does not work,{" "}
//         <a href="https://testflight.apple.com/join/9E5yhzav">click here</a> to join the TestFlight.
//       </p>
//     </div>
//   );
// };

// export default Partido;


