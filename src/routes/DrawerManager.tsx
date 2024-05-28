import AppText from "@app/components/AppText";
import { storeRedux } from "@app/redux/store";
import HomeScreen from "@app/screens/MainScreen/HomeScreen";
import ProfileScreen from "@app/screens/MainScreen/ProfileScreen";
import SettingScreen from "@app/screens/MainScreen/SettingScreen";
import { RouteNames } from "@app/values/RouteNames";
import { Titles } from "@app/values/Titles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";

const Drawer = createDrawerNavigator();

type DrawerRouteType = {
    name: string,
    component: any,
    label: any
    keyName: string
}
const listDrawerRoute: DrawerRouteType[] = [
    {
        name: RouteNames.HOME_SCREEN,
        component: HomeScreen,
        label: AppText.getText(Titles.HOME),
        keyName: Titles.HOME
    },
    {
        name: RouteNames.PROFILE_SCREEN,
        component: ProfileScreen,
        label: AppText.getText(Titles.PROFILE),
        keyName: Titles.PROFILE
        
    },
    {
        name: RouteNames.SETTING_SCREEN,
        component: SettingScreen,
        label: AppText.getText(Titles.SETTING),
        keyName: Titles.SETTING

    },

]
export const DrawerManager = (props: any) => {
    const [drawerRoutes, setDrawerRoutes] = useState<DrawerRouteType[]>(listDrawerRoute);

 
    useEffect(() => {
        const unsubscribe = storeRedux.subscribe(() => {
            const updatedRoutes = listDrawerRoute.map(route => {
                return {
                    ...route,
                    label: AppText.getText(route.keyName)
                };
            });
            setDrawerRoutes(updatedRoutes);
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);


return (
    <Drawer.Navigator initialRouteName={RouteNames.HOME_SCREEN}>
        {
            drawerRoutes.map((r, i) => (
                (r.name === RouteNames.HOME_SCREEN) ? (
                    <Drawer.Screen
                        {...r}
                        key={i}
                        initialParams={{ data: props.name }}
                        options={{ title: r.label }}
                    />
                ) : (
                    <Drawer.Screen
                        {...r}
                        key={i}
                        options={{ title: r.label }}
                    />
                )
            ))
        }
    </Drawer.Navigator>
)
}