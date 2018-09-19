'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";
import {BoxShadow} from 'react-native-shadow';
import {ConvertRatio} from "../../config/settings";

export default class WheelInput extends Component {
    static propTypes = {
        height: PropTypes.number,
        itemHeight: PropTypes.number,
        items: PropTypes.array,
        units: PropTypes.string,
        onSet: PropTypes.func,
        style: PropTypes.object
    };

    items = [];
    gapItems = [];

    constructor(props) {
        super(props);

        let itemsInView = Math.trunc(this.props.height / this.props.itemHeight);
        let gapItemsCount = Math.trunc(itemsInView / 2);

        this.items = this.props.items;

        let index;
        for (index = 0; index < gapItemsCount; index ++) {
            this.gapItems.push("");
        }

        this.props.items.forEach((propItem) => {
            this.gapItems.push(propItem);
        });

        for (index = 0; index < gapItemsCount; index ++) {
            this.gapItems.push("");
        }

        this.state = {
            item: 0,
            hasMomentum: false
        };
    }

    scrollToItem(item) {
        let newScrollPosition = item * this.props.itemHeight * ConvertRatio;
        this.scrollView.scrollTo({y: newScrollPosition});
    }

    handleItemChange(scrollEvent, needScrollToItem) {
        if (this.state.hasMomentum) {
            return;
        }

        let offset = scrollEvent.nativeEvent.contentOffset;
        if (offset) {
            let item = Math.round(offset.y / (this.props.itemHeight * ConvertRatio));

            if (needScrollToItem) {
                this.scrollToItem(item);
            }

            if (this.state.item !== item) {
                this.setState({item: item});
                if (this.props.onSet) {
                    this.props.onSet(this.items[this.state.item]);
                }
            }
        }
    }

    changeItemAndScroll(scrollEvent) {
        this.handleItemChange(scrollEvent, true);
    }

    render() {
        let itemText = this.items[this.state.item];

        return (
            <View style={[this.props.style, {height: this.props.height * ConvertRatio, width: '100%', position: 'relative'}]}>
                <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: '100%', alignItems: 'center'}}>
                    <View style={[styles.shadow, {top: (this.props.height - 41.5)/2 * ConvertRatio}]}>
                        <BoxShadow style={{zIndex: -1}} setting={{
                            width: 127.5 * ConvertRatio,
                            height: 43.5 * ConvertRatio,
                            color: "#000",
                            border: 7.5 * ConvertRatio,
                            radius: 7.5 * ConvertRatio,
                            opacity: 0.1,
                            x: 0,
                            y: 2.5 * ConvertRatio
                        }}>
                            <View style={styles.activeContainer}>
                                <Text style={[styles.activeText, {width: 10 * ConvertRatio}]} />
                                <Text style={[styles.activeText, {width: 30 * ConvertRatio}]}>{this.props.units}</Text>
                                <Text style={[styles.activeText, {width: 10 * ConvertRatio}]}>></Text>
                            </View>
                        </BoxShadow>
                    </View>

                    <ScrollView
                        pagingEnabled={true}
                        horizontal={false}
                        onScroll={this.handleItemChange.bind(this)}
                        onScrollEndDrag={this.changeItemAndScroll.bind(this)}
                        onMomentumScrollBegin={(event) => {
                            this.setState({hasMomentum: true});
                        }}
                        onMomentumScrollEnd={(event) => {
                            this.setState({hasMomentum: false});
                            this.changeItemAndScroll(event);
                        }}
                        ref={(scrollView) => this.scrollView = scrollView}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.buttonsContainer}>
                            {this.gapItems.map((buttonText, index) => {
                                let isGap = buttonText === "";
                                let buttonStyle = isGap
                                    ? [styles.gap, {
                                            height: this.props.itemHeight * ConvertRatio,
                                            lineHeight: this.props.itemHeight * ConvertRatio,
                                            marginTop: -(this.props.itemHeight - 2) / 2 * ConvertRatio
                                      }]
                                    : [styles.buttonText, {
                                            height: this.props.itemHeight * ConvertRatio,
                                            lineHeight: this.props.itemHeight * ConvertRatio,
                                            marginTop: -(this.props.itemHeight - 2) / 2 * ConvertRatio
                                      }];

                                return (
                                    <View style={[styles.button, {height: this.props.itemHeight * ConvertRatio}]} key={index}>
                                        {!isGap && <View style={[styles.dash,{marginTop: (this.props.itemHeight + 10)/ 2 * ConvertRatio}]}/>}
                                        <Text style={buttonStyle}>{buttonText}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>

                    <Text style={[styles.activeText, {
                        height: 43.5 * ConvertRatio,
                        width: 30 * ConvertRatio,
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        right: 47 * ConvertRatio,
                        top: (this.props.height - 41.5)/2 * ConvertRatio
                    }]}>{itemText}</Text>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonsContainer: {
        width: 127.5 * ConvertRatio,
        height: '100%',
        paddingLeft: 63 * ConvertRatio
    },
    button: {
        width: 63 * ConvertRatio,
        justifyContent: 'center'
    },
    dash: {
        width: 10 * ConvertRatio,
        height: 0.5 * ConvertRatio,
        backgroundColor: "rgba(0,0,0,0.2)",
        marginLeft: -5 * ConvertRatio
    },
    gap: {
        width: 42.5 * ConvertRatio
    },
    buttonText: {
        width: 42.5 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 12.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "rgba(0,0,0,0.2)",
        borderLeftWidth: 0.5 * ConvertRatio,
        borderLeftColor: "#e0e3e6"
    },
    shadow: {
        position: "absolute"
    },
    activeContainer: {
        width: 127.5 * ConvertRatio,
        height: 43.5 * ConvertRatio,
        borderRadius: 10.5 * ConvertRatio,

        backgroundColor: "#ffffff",

        flex: 1,
        flexDirection: 'row'
    },
    activeText: {
        height: 41.5 * ConvertRatio,
        lineHeight: 41.5 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 17.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000"
    }
});

AppRegistry.registerComponent('WheelInput', () => WheelInput);