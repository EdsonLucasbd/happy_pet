import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';
import happyPetLogo from '../images/happyPetLogo.png';


function landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={happyPetLogo} alt="happy" />

        <main>
          <h1>Leve alegria para o seu lar</h1>
          <p>Visite ONGs e abrigos e mude a vida de um pet.</p>
        </main>

        <div className="location">
          <strong>Salvador</strong>
          <span>Bahia</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default landing;