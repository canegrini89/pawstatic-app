import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import TabBarNavigation from './src/components/tabBarNavigation';
import Loading from './components/loading';
import Register from './screens/register';
import Login from './screens/login';
import TabBar from './components/tabBar';
import Friends from './screens/friends';
import Chat from './components/chat';

const App = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Register,
      Login,
      TabBar,
      Friends,
      Chat,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

export default App;
