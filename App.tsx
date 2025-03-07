import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "./src/containers/screens/home/home.screen";
import ReportScreen from "./src/containers/screens/report/report.screen";
import NewsScreen from "./src/containers/screens/news/news.screen";
import ProfileScreen from "./src/containers/screens/profile/profile.screen";
import { CreateReportComponent } from "./src/containers/screens/report/comp/create-report/create-report";
import LoginScreen from "./src/containers/screens/auth/sign-in/LoginScreen";
import LoginOTPScreen from "./src/containers/screens/auth/comp/loginotp";
import SplashScreen from "./src/containers/screens/auth/sign-up/SplashScreen";
import { AnalyticsScreen } from "./src/containers/screens/analytics/analytics.screen";
import { RequestDetailScreen } from "./src/containers/screens/report/comp/detail-screen/detail.screen";

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
        name="Chấm công"
        component={HomeScreen}
        options={{
          title: 'Chấm công',
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
        component={AnalyticsScreen}
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
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="sign-in"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="sign-in-otp"
          component={LoginOTPScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="detail-screen"
          component={RequestDetailScreen}
          options={{
            headerShown: false
          }}
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
              backgroundColor: "#f0f0f0",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
