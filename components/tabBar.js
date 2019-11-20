import React, {useState, useEffect} from 'react';
import {Text, StatusBar, Button} from 'react-native';
import firebase from 'react-native-firebase';
import {TabBar, Icon} from '@ant-design/react-native';
import Profile from '../screens/profile';
import Friends from '../screens/friends';
import {withNavigation} from 'react-navigation';

const TabBarNavigation = props => {
  const [selectedTab, setSelectedTab] = useState('Home');

  // useEffect(() => {
  //   if (props.navigation.state.key === 'Chat') {
  //     let value = props.navigation.getParam('param');
  //     if (value !== null) {
  //       setSelectedTab(value);
  //     } else {
  //       setSelectedTab('Home');
  //     }
  //   }
  // }, [props.navigation]);

  const handleChangePage = text => {
    setSelectedTab(text);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#000000">
        <TabBar.Item
          title="Home"
          key="Home"
          icon={<Icon name="home" />}
          selected={selectedTab === 'Home'}
          data-seed="logId"
          onPress={() => handleChangePage('Home')}>
          <Text>hello</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Chat"
          key="Chat"
          icon={<Icon name="smile" />}
          selected={selectedTab === 'Pets'}
          data-seed="logId1"
          onPress={() => handleChangePage('Pets')}>
          <Text>hello</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Plus"
          key="Plus"
          icon={<Icon name="plus-circle" />}
          selected={selectedTab === 'Plus'}
          data-seed="logId1"
          onPress={() => handleChangePage('Plus')}>
          <Text>Koubei</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Friend"
          key="Friend"
          icon={<Icon name="heart" />}
          dot
          selected={selectedTab === 'Friend'}
          onPress={() => handleChangePage('Friend')}>
          <Friends />
        </TabBar.Item>
        <TabBar.Item
          title="Profile"
          key="Profile"
          dot
          icon={<Icon name="user" />}
          selected={selectedTab === 'Profile'}
          onPress={() => handleChangePage('Profile')}>
          <Profile />
        </TabBar.Item>
      </TabBar>
    </>
  );
};

export default withNavigation(TabBarNavigation);
