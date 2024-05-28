import { CallApi } from "@app/apis";
import { ItemInCollection } from "@app/types/Models";

import { CategoryConstant } from "@app/values/Category";
import React, { Component, createRef } from "react";
import { FlatList, Image, Text, View } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { ScrollView } from 'react-native-virtualized-view';
import styles from "./styles";
import BannerComponent from "./BannerComponent";
import NewOrRankingComponent from "./NewOrRankingCateComponent";
import { ColorNames } from "@app/values/ColorNames";
import { Titles } from "@app/values/Titles";

class TabMusicScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            listBanner: [],
            listDataBestGenre: {},
            listNewMusicData: [],
            listRankingData: [],
            listDataCollection: [],
            pageIndex: 0
        }
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData() {
        Promise.all([
            CallApi.getBannerInHome(0, 10),
            CallApi.getBestGenreInHome(),
            CallApi.getNewCateInHome(0, 10),
            CallApi.getRankingCateInHome(),
            CallApi.getCollectionListInHome(),

        ])
            .then((response: any) => {
                let newStateObj: any = {
                    listBanner: response[0],
                    listDataBestGenre: response[1],
                    listNewMusicData: response[2],
                    listRankingData: response[3],
                    listDataCollection: response[4],
                }

                this.setState(newStateObj)

            })
            .catch(_ => this.setState({
                loadDataError: true,
                loading: false,
                refreshing: false
            }))
    }

    _renderTopBar() {
        return (
            <View style={styles.containerTopBar}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../../assets/images/logo.jpg')}
                />

                <View style={{ flexDirection: 'row' }}>
                    <EvilIcons name="search" size={30} color={ColorNames.black} style={{ marginEnd: 15 }} />
                    <EvilIcons name="bell" size={30} color={ColorNames.black} style={{ marginEnd: 15 }} />
                    <EvilIcons name="user" size={30} color={ColorNames.black} style={{ marginEnd: 15 }} />
                </View>
            </View>
        )
    }



    _viewItemSongBestGenre(itemInCollection: ItemInCollection, index: number) {
        let marginStart = 0
        if (index % 2 == 0) {
            marginStart = 15
        }
        return (
            <View
                style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 15, marginTop: 6, marginBottom: 8 }}
            >
                <Image
                    style={[styles.imageItemSongBestGenre, { marginStart }]}
                    source={{ uri: itemInCollection.avatar }}
                />
                <Text
                    style={{ position: 'absolute', color: ColorNames.while, fontFamily: 'quicksand_500', fontSize: 23, flex: 1 }}
                >
                    {itemInCollection.itemName}
                </Text>
            </View>
        );
    };

    _renderBestGenreComponent() {
        const { listDataBestGenre } = this.state;

        return (
            <View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textViewCate}>{listDataBestGenre.collectionName}</Text>

                        <Text style={styles.textViewAll}>{Titles.VIEW_ALL}</Text>
                    </View>
                    <FlatList
                        style={{ marginTop: 5 }}
                        numColumns={2}
                        renderItem={({ item, index }) => this._viewItemSongBestGenre(item, index)}
                        data={listDataBestGenre.items}
                        keyExtractor={item => item.id}
                    />

                </View>
            </View>
        )
    }


    _viewItemSongCollection(itemInCollection: ItemInCollection, index: number) {
        const marginStart = index === 0 ? 15 : 0;

        return (
            <View>
                <Image
                    style={[styles.imageItemSongCollection, { marginStart }]}
                    source={{ uri: itemInCollection.avatar }}
                />
                <AntDesignIcons
                    style={{ position: 'absolute', bottom: 15, end: 15 }}
                    name="play"
                    size={25}
                    color={ColorNames.while}
                />
            </View>
        );
    };

    _renderCollectionComponent(collectionType: any) {

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textViewCate}>{collectionType.collectionName}</Text>
                    <Text style={styles.textViewAll}>{Titles.VIEW_ALL}</Text>
                </View>
                <FlatList
                    style={{ marginTop: 5 }}
                    horizontal
                    renderItem={({ item, index }) => this._viewItemSongCollection(item, index)}
                    data={collectionType.items}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }

    render() {
        const {
            listNewMusicData,
            listRankingData,
            listDataCollection,
            listBanner } = this.state;
        console.log("render")

        return (
            <View style={styles.container}>
                {this._renderTopBar()}
                <ScrollView>
                    <BannerComponent listBanner={listBanner} />
                    {this._renderBestGenreComponent()}
                    <NewOrRankingComponent listData={listNewMusicData} type={CategoryConstant.hot} />
                    <NewOrRankingComponent listData={listRankingData} type={CategoryConstant.rank} />
                    <FlatList
                        renderItem={({ item: collectionType }) => this._renderCollectionComponent(collectionType)}
                        data={listDataCollection}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default TabMusicScreen;