import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import Home from './Home';
import MyPage from './MyPage';
import SaveList from './SaveList';

function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerTitleAlign: "center", tabBarIcon: () => <Icon name='home' /> }}
      />
      <Tab.Screen
        name="SaveList"
        component={SaveList}
        options={{ title: "Save", headerTitleAlign: "center", tabBarIcon: () => <Icon name='favorite' /> }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerTitleAlign: "center", tabBarIcon: () => <Icon name='person' /> }} />
    </Tab.Navigator>
  )
}

export default Tabs;