import React, { Component } from 'react';
import {
    Image,
    View
} from 'react-native';
import PagerView from 'react-native-pager-view';
import styles from './styles';

class BannerComponent extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            pageIndex: 0,
        };
    }

    _handlePageChange = (event: any) => {
        const { position } = event.nativeEvent;
        const { listBanner } = this.props;
        const { pageIndex } = this.state
        if (position !== pageIndex && listBanner.length > 0) {
            this.setState({ pageIndex: position });
        }
    };


    render() {
        const { listBanner } = this.props;
        const { pageIndex } = this.state;

        console.log(pageIndex)
        return (
            <View style={styles.containerBanner}>
                <PagerView
                    style={{ width: '100%', height: 180 }}
                    initialPage={pageIndex}
                    onPageSelected={this._handlePageChange}
                    useNext={false}
                >
                    {listBanner.map((item: any, index: number) => (
                        <View key={index} style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: item.file }}
                                    style={{ width: '90%', height: '90%', borderRadius: 15 }}
                                />
                            </View>
                        </View>
                    ))}
                </PagerView>

                <View style={styles.dotContainer}>
                    {listBanner.map((item: any, index: number) => (
                        <View key={index} style={[styles.dot, pageIndex === index && styles.activeDot]} />
                    ))}
                </View>
            </View>
        );
    }
}


export default BannerComponent;