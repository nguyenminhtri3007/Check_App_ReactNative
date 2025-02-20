import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "./src/containers/screens/home/home.screen";
import ReportScreen from "./src/containers/screens/report/report.screen";
import StatsScreen from "./src/containers/screens/analytics/analytics.screen";
import NewsScreen from "./src/containers/screens/news/news.screen";
import ProfileScreen from "./src/containers/screens/profile/profile.screen";
import { CreateReportComponent } from "./src/containers/screens/report/comp/create-report/create-report";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FD4E20",
        tabBarInactiveTintColor: "#808B99",
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      <Tab.Screen
        name="Chấm Công"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("./assets/icons/SealCheck.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Đơn Báo"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("./assets/icons/report.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Thống Kê"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("./assets/icons/stats.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bảng Tin"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("./assets/icons/new.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cá Nhân"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("./assets/icons/User.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="create-report"
          component={CreateReportComponent}
          options={{
            title: "Tạo đơn báo",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: "#f5f5f5",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
