import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/ongs-map.css'

interface Ong {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OngsMap() {
  const [ongs, setOngs] = useState<Ong[]>([]);

  useEffect(() => {
    api.get('ongs').then(response => {
      setOngs(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um abrigo no mapa</h2>
          <p>Muitos pets estão esperando a sua visita</p>
        </header>

        <footer>
          <strong>Salvador</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <Map 
        center={[-12.9452303,-38.4534453]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
      
        {
          ongs.map(ong => {
            return (
              <Marker 
              key={ong.id}
                icon={mapIcon}
                position={[ong.latitude, ong.longitude]}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {ong.name}
                  <Link to={`/ong/${ong.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>

      <Link to="/ong/create" className="create-ong">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OngsMap;