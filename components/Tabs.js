import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import MyPage from './MyPage';
import SaveList from './SaveList';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SaveList" component={SaveList} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  )
}

export default Tabs;