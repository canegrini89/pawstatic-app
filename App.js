import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import TabBarNavigation from './src/components/tabBarNavigation';
import Loading from './components/loading';
import Register from './screens/register';
import Login from './screens/login';

const App = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Register,
      Login,
      // TabBarNavigation,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default App;
