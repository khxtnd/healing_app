import AppText from "@app/components/AppText";
import { storeRedux } from "@app/redux/store";

import TabHomeScreen from "@app/screens/MainScreen/HomeScreen/TabHomeScreen";
import TabMusicScreen from "@app/screens/MainScreen/HomeScreen/TabMusicScreen";
import TabVideoScreen from "@app/screens/MainScreen/HomeScreen/TabVideoScreen";
import { ColorNames } from "@app/values/ColorNames";
import { RouteNames } from "@app/values/RouteNames";
import { Titles } from "@app/values/Titles";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontNames } from "@app/values/FontNames";
import { TabBarIndicator } from "react-native-tab-view";

// const Tab =createMaterialBottomTabNavigator()
const Tab = createBottomTabNavigator();

type BottomRouteType = {
    name: string,
    component: React.ComponentType<any>,
    options: {
        tabBarLabel: string,
        tabBarIcon: (color: string) => JSX.Element,
    },
    keyName: string
}

const initialBottomTabRoutes: BottomRouteType[] = [
    {
        name: RouteNames.TAB_HOME_SCREEN,
        component: TabHomeScreen,
        options: {
            tabBarLabel: AppText.getText(Titles.HOME),
            tabBarIcon: (color) => (
                <Icon
                    color={color}
                    name="home" size={30}
                />
            ),
        },
        keyName: Titles.HOME
    },
    {
        name: RouteNames.TAB_VIDEO_SCREEN,
        component: TabVideoScreen,
        options: {
            tabBarLabel: AppText.getText(Titles.VIDEO),
            tabBarIcon: (color) => (
                <MaterialCommunityIcons name="video" color={color} size={26} />
            ),
        },
        keyName: Titles.VIDEO
    },
    {
        name: RouteNames.TAB_MUSIC_SCREEN,
        component: TabMusicScreen,
        options: {
            tabBarLabel: AppText.getText(Titles.MUSIC),
            tabBarIcon: (color) => (
                <MaterialCommunityIcons name="music" color={color} size={26} />
            ),
        },
        keyName: Titles.MUSIC
    },
]

export const BottomTabManager = () => {
    const [bottomTabs, setBottomTabRoutes] = useState<BottomRouteType[]>(initialBottomTabRoutes);

    useEffect(() => {
        const unsubscribe = storeRedux.subscribe(() => {
            const updatedRoutes = initialBottomTabRoutes.map(route => ({
                ...route,
                options: {
                    ...route.options,
                    tabBarLabel: AppText.getText(route.keyName),
                }
            }));
            setBottomTabRoutes(updatedRoutes);
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <Tab.Navigator

            screenOptions={
                {
                    tabBarLabelStyle: {
                        fontFamily: FontNames.notosans_bold,
                        fontSize: 10
                    },
                    tabBarStyle: {
                        height: 70,

                    },
                    headerShown: false,
                    tabBarActiveTintColor: ColorNames.green4,
                    tabBarInactiveTintColor: ColorNames.blue3,
                }

            }

        >
            {
                bottomTabs.map((r, i) => <Tab.Screen

                    key={i}
                    name={r.name}
                    component={r.component}
                    options={{
                        tabBarLabel: r.options.tabBarLabel,
                        tabBarIcon: ({ color }) => r.options.tabBarIcon(color),

                    }}
                />)
            }
        </Tab.Navigator >
    );
}
