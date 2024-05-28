import AppText from "@app/components/AppText";
import { storeRedux } from "@app/redux/store";
import TabArtistScreen from "@app/screens/MainScreen/HomeScreen/TabHomeScreen/TabArtistScreen";
import TabSongScreen from "@app/screens/MainScreen/HomeScreen/TabHomeScreen/TabSongScreen";
import { ColorNames } from "@app/values/ColorNames";
import { RouteNames } from "@app/values/RouteNames";
import { Titles } from "@app/values/Titles";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { TabBar, TabView } from "react-native-tab-view";

type TobTabRouteType = {
    key: string,
    title: string,
    component: any,
    keyName: string
}

const listTopTabRoute: TobTabRouteType[] = [
    {
        key: RouteNames.TAB_SONG_SCREEN,
        title: AppText.getText(Titles.SONG),
        component: TabSongScreen,
        keyName: Titles.SONG
    },
    {
        key: RouteNames.TAB_ARTIST_SCREEN,
        title: AppText.getText(Titles.ARTIST),
        component: TabArtistScreen,
        keyName: Titles.ARTIST
    },
]

export const TopTabManager = () => {
    const [index, setIndex] = useState(0);
    const [tabRoutes, setTabRoutes] = useState<TobTabRouteType[]>(listTopTabRoute);

    useEffect(() => {
        const unsubscribe = storeRedux.subscribe(() => {
            const updatedRoutes = listTopTabRoute.map(route => ({
                ...route,
                title: AppText.getText(route.keyName)
            }));
            setTabRoutes(updatedRoutes);
        });
    
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);
    

    const renderScene = ({ route }: { route: TobTabRouteType }) => {
        const Component = route.component;
        return <Component />;
    };

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: ColorNames.blue5 }}
            style={{ backgroundColor: ColorNames.while }}
            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? ColorNames.blue3 : ColorNames.black }}>{route.title}</Text>
            )}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes: tabRoutes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
        />
    );
};