import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function ScrollButton(props) {

    const pokeFleche = process.env.PUBLIC_URL + "/assets/images/icons8-flèche-vers-le-haut-48.png"


  return (
    <button onClick={props.goTop} style={{display: props.visible ? 'inline' : 'none'}} className="button-go-top">
      <img src={pokeFleche} alt="" />
    </button>
  );
}

export default ScrollButton;
