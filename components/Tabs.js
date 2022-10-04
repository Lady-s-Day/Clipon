import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import Home from "./Home";
import MyPage from "./MyPage";
import SaveList from "./SaveList";
import { Colors } from "../config";

function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.navy,
      })}
    >
      <Tab.Screen
        name="ホーム"
        component={Home}
        options={{
          title: "ホーム",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
          headerStyle: { backgroundColor: Colors.beige },
          tabBarLabelStyle: {
            fontFamily: "font2"
          }
        }}
      />
      <Tab.Screen
        name="お気に入り"
        component={SaveList}
        options={{
          title: "お気に入り",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.beige },
          tabBarIcon: ({ color }) => <Icon name="favorite" color={color} />,
          tabBarLabelStyle: {
            fontFamily: "font2"
          }
        }}
      />
      <Tab.Screen
        name="マイページ"
        component={MyPage}
        options={{
          title: "マイページ",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
          headerStyle: { backgroundColor: Colors.beige },
          tabBarLabelStyle: {
            fontFamily: "font2"
          }
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
