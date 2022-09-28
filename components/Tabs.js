import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import Home from './Home';
import MyPage from './MyPage';
import SaveList from './SaveList';
import { Colors } from '../config'

function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.themeColor,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="ホーム"
        component={Home}
        options={{ headerTitleAlign: "center", tabBarIcon: ({ color }) => <Icon name='home' color={color} /> }}
      />
      <Tab.Screen
        name="お気に入り"
        component={SaveList}
        options={{ headerTitleAlign: "center", tabBarIcon: ({ color }) => <Icon name='favorite' color={color} /> }}
      />
      <Tab.Screen
        name="マイページ"
        component={MyPage}
        options={{ headerTitleAlign: "center", tabBarIcon: ({ color }) => <Icon name='person' color={color} /> }} />
    </Tab.Navigator>
  )
}

export default Tabs;