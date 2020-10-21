import React, { useEffect, useState } from "react";
//import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/ong.css';

interface Ong {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OngParams {
  id: string;
}

export default function Ong() {
  const params = useParams<OngParams>();
  const [ong, setOng] = useState<Ong>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`ongs/${params.id}`).then(response => {
      setOng(response.data);
    });
  }, [params.id]);

  if (!ong) {
    return <p>Carregando</p>;
  }

  return (
    <div id="page-ong">
      <Sidebar />

      <main>
        <div className="ong-details">
          <img src={ong.images[activeImageIndex].url} alt={ong.name} />

          <div className="images">
            {ong.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className="active" 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                  >
                  <img src={image.url} alt={ong.name} />
                </button>
              )
            })}
          </div>
          
          <div className="ong-details-content">
            <h1>{ong.name}</h1>
            <p>
              {ong.about}
            </p>

            <div className="map-container">
              <Map 
                center={[ong.latitude,ong.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker interactive={false} icon={mapIcon} position={[ong.latitude,ong.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${ong.latitude},${ong.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>
              {ong.instructions}
            </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {ong.opening_hours}
              </div>
              { ong.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}