import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Incidets from './pages/Incidents';
import Detail from './pages/Detail';

const appStack = createStackNavigator();
// headerShown: false --> é para desabilitar o cabeçalho do app
export default function Routes(){
    return(
        <NavigationContainer>
            <appStack.Navigator screenOptions={{headerShown: false}}>  
                <appStack.Screen name="Incidents" component={ Incidets } />
                <appStack.Screen name="Detail" component={ Detail } />
            </appStack.Navigator>
        </NavigationContainer>
    );

}