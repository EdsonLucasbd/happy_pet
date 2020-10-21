import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Ong {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OngsMap() {
  const navigation = useNavigation();
  const [ongs, setOngs] = useState<Ong[]>([]);

  useFocusEffect(() => {
    api.get('ongs').then(response => {
      setOngs(response.data);
    });
  });

  function handleNavigateToCreateOng() {
    navigation.navigate('SelectMapPosition');
  }

  function handleNavigateToOngDetails(id: number) {
    navigation.navigate('OngDetails', { id });
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -12.9452397,
          longitude: -38.4534359,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
          style={styles.map}
        >
        {ongs.map(ong => {
          return (
            <Marker
              key={ong.id}
              icon={mapMarker}
              calloutAnchor={{ x: 2.4, y: 0.8 }}
              coordinate={{
                latitude: ong.latitude,
                longitude: ong.longitude,
              }}
            >
              <Callout tooltip={true} onPress={() => handleNavigateToOngDetails(ong.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{ong.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {ongs.length} Ongs encontradas
        </Text>
        
        <RectButton style={styles.createOngButton} onPress={handleNavigateToCreateOng}>
          <Feather name="plus" size={20} color="#fff"/>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3,
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#04b65d',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 5,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOngButton: {
    width: 56,
    height: 56,
    backgroundColor: '#00FF7F',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
