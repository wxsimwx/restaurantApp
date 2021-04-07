// App.js
import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import RestaurantScreen from './components/RestaurantScreen';
import LocationScreen from './components/LocationScreen';
import DetailsScreen from './components/DetailsScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const HomeStack = createDrawerNavigator({
    Restaurant: {
      screen: RestaurantScreen
    },
    Location: {
      screen: LocationScreen
    }
});

const AppStack = createStackNavigator({
  Details: {
    screen: DetailsScreen,
  },
  Home: {
    screen: HomeStack,
    navigationOptions: () => ({
      title: 'Restaurants',
    })
  },
}, {
      initialRouteName: "Home"
});



const AppContainer = createAppContainer(AppStack);
