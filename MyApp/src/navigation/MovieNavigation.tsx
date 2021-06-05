import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MovieListScreen from '../screen/MovieListScreen';

const Stack = createStackNavigator();

const MovieNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Movies"
          component={MovieListScreen}
          options={{
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {backgroundColor: 'black'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MovieNavigator;
