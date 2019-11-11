import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import TabBarNavigation from './src/components/tabBarNavigation';
import Loading from './components/loading';
import Register from './screens/register';
import Login from './screens/login';
import TabBar from './components/tabBar';

const App = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Register,
      Login,
      TabBar,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

export default App;
