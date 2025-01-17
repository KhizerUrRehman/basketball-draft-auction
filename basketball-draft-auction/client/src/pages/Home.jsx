import React from 'react';
import rbl from "../assets/rbl.jpg";

function Home() {
  return (
    <div>
      <h1>Welcome to the RBL Draft Auction!</h1>
      <p>Select Captains Dashboard to see current screen, select Player Pool to see remaining players.</p>
      <img src={rbl} alt="RBL Champs" className="rbl" />
    </div>
  );
}

export default Home;
