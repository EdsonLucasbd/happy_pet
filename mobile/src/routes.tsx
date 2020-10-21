import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OngsMap from './pages/OngsMap';
import OngDetails from './pages/OngDetails';
import SelectMapPosition from './pages/createOng/SelectMapPosition';
import OngData from './pages/createOng/OngData';
import Header from './components/Header';

export default function Routes() {
  return(
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen 
          name="OngsMap" 
          component={OngsMap} 
        />
        <Screen 
          name="OngDetails" 
          component={OngDetails} 
          options={{ 
            headerShown: true,
            header: () => <Header showCancel={false} title="Ong" />
          }} 
        />
        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{ 
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }} 
        />
        <Screen 
          name="OngData" 
          component={OngData} 
          options={{ 
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }} 
        />
      </Navigator>
    </NavigationContainer>
  );
}