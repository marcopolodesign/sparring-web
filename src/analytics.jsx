import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-42PHLQGFNE'); // Replace with your Google Analytics Measurement ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};