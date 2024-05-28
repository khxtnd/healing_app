
import React, { Component, createRef } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import PagerView from 'react-native-pager-view';
import styles from './styles';
import { Category, Song } from '@app/types/Models';
import { ColorNames } from '@app/values/ColorNames';




class NewOrRankingComponent extends Component<any, any> {
  pagerViewRef: any;
  flatlistRef: any;
  constructor(props: { listData: Category[], type: string }) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
    this.pagerViewRef = createRef();
    this.flatlistRef = createRef();

  }

  _handleTabPress = (index: number) => {
    this.setState({ pageIndex: index });
    this.pagerViewRef.current.setPage(index);
  };

  _handlePageChange = (event: any) => {
    const { position } = event.nativeEvent;
    this.setState({ pageIndex: position });
    this._scrollToIndex(position)
  };

  _scrollToIndex = (index: number) => {
    const { listData} = this.props;
    if (this.flatlistRef && this.flatlistRef.current && listData.length > 0) {
      this.flatlistRef.current.scrollToIndex({ index: index, animated: true, viewPosition: 0.5 });

    }
  };

  _viewItemSong = (song: Song) => {
    return (
      <View style={{ flexDirection: 'row', height: 60, alignItems: 'center' }}>
        <Image
          style={[styles.imageItemSong, { marginStart: 15 }]}
          source={{ uri: song.avatar }}
        />
        <View>
          <Text
            style={{ color: ColorNames.black, fontFamily: 'quicksand_600', fontSize: 15 }}>
            {song.songName}</Text>
          <Text
            style={{ color: ColorNames.black, fontFamily: 'quicksand_400', fontSize: 12 }}>
            {song.artists[0].aliasName}</Text>
        </View>

      </View>
    );
  };

  _renderPagerCategory(category: Category) {
    return (
      <ScrollView
        scrollEnabled={false}
        horizontal>
        <View
          style={styles.container}>
          <FlatList
            scrollEnabled={false}
            style={{ marginTop: 5 }}
            renderItem={({ item: song }) => this._viewItemSong(song)}
            data={category.items as unknown as Array<Song>}
            keyExtractor={item => item.id.toString()}
          />
        </View>

      </ScrollView>

    )
  }


  render() {
    const { listData, type } = this.props;
    const { pageIndex } = this.state;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.textViewCate}>{type}</Text>
        <FlatList
          horizontal
          ref={this.flatlistRef}
          data={listData}
          renderItem={({ item, index }) => {
            let marginStart = index === 0 ? 15 : 0;
            return (
              <TouchableOpacity
                style={[styles.tabItem, { marginStart: marginStart }]}
                onPress={() => this._handleTabPress(index)}
              >
                <Text
                  style={[
                    styles.tabBarItemText,
                    index === pageIndex && styles.activeTabText,
                  ]}
                >
                  {item.cateName}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}

        />

        <PagerView style={{flex: 1}} initialPage={pageIndex} onPageSelected={this._handlePageChange} ref={this.pagerViewRef} useNext={false}>
          {listData.map((category: Category, index: number) => (
            <View key={index}>
              {this._renderPagerCategory(category)}
            </View>
          ))}
        </PagerView>
      </View>
    );
  }
}


export default NewOrRankingComponent;