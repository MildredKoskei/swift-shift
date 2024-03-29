import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="dhiwise-navigation">
      <h1>Homepage</h1>
      <p className="headline">
        This project was generated By{" "}
        <a href="https://www.dhiwise.com">Dhiwise</a>. Quickly use below links
        to navigate through all pages.
      </p>
      <ul>
        <li>
          <Link to="/">LandingPage</Link>
        </li>
        <li>
          <Link to="/aboutus">AboutUs</Link>
        </li>
        <li>
          <Link to="/listing">Listing</Link>
        </li>
        <li>
          <Link to="/listingmapview">ListingMapView</Link>
        </li>
        <li>
          <Link to="/propertydetails">PropertyDetails</Link>
        </li>
        <li>
          <Link to="/contactpage">ContactPage</Link>
        </li>
        <li>
          <Link to="/error">Error</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/privacypolicy">PrivacyPolicy</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
