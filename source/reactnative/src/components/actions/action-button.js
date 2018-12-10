/**
 * Actions Component.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#schema-action.openurl
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Platform, Modal, Button, WebView, Alert } from "react-native";

import { StyleManager } from '../../styles/style-config'
import * as Utils from '../../utils/util';
import { InputContextConsumer } from '../../utils/context'
import * as Constants from '../../utils/constants';
import { HostConfigManager } from '../../utils/host-config'


export class ActionButton extends Component {

    styleConfig = StyleManager.getManager().styles;

    constructor(props) {
        super(props);

        this.payload = props.json;
        this.title = Constants.EmptyString;
        this.type = Constants.EmptyString;
        this.iconUrl = Constants.EmptyString;
        this.data = {};
        if (props.json.type === 'Action.ShowCard') {
            this.showCardHandler = props.onShowCardTapped;
        }
    }

    state = {
        modalVisible: false,
        showCard: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        if (HostConfigManager.getHostConfig().supportsInteractivity === false) {
            return null;
        }
        this.parseHostConfig();
        const ButtonComponent = Platform.select({
            ios: () => require('TouchableOpacity'),
            android: () => require('TouchableNativeFeedback'),
        })();

        if (this.payload.type === Constants.ActionSubmit) {
            return (<InputContextConsumer>
                {({ inputArray, onExecuteAction }) => (
                    <ButtonComponent style={{ flexGrow: 1 }} onPress={() => {
                        this.onSubmitActionCalled(inputArray, onExecuteAction)
                    }}>
                        {this.buttonContent()}
                    </ButtonComponent>
                )}
            </InputContextConsumer>);
        }
        else if (this.payload.type === Constants.ActionOpenUrl) {
            return (<InputContextConsumer>
			 {({ onExecuteAction }) => (<ButtonComponent style={{ flexGrow: 1 }} onPress={() => {
                    this.onOpenURLCalled(onExecuteAction)
                }}>{this.buttonContent()}
                </ButtonComponent>)}
            </InputContextConsumer>);
        } else if (this.payload.type === Constants.ActionShowCard) {
			return (<ButtonComponent 
						style={{ flexGrow: 1 }} 
						onPress={this.changeShowCardState}>
					{this.buttonContent()}
            </ButtonComponent>)
        }
    }

    /**
     * @description Invoked for the action type Constants.ActionSubmit
     */
    onSubmitActionCalled(inputItem, onExecuteAction) {
        let mergedObject = null;
        if (this.data !== null) {
            mergedObject = { ...this.data, ...inputItem };
        } else {
            mergedObject = inputItem;
        }
        let actionObject = { "type": this.payload.type, "data": mergedObject };
        onExecuteAction(actionObject);
    }

    onOpenURLCalled = (onExecuteAction) => {
        let actionObject = { "type": this.payload.type, "url": this.payload.url };
        onExecuteAction(actionObject);
    }

    changeShowCardState = () => {
        this.showCardHandler(this.payload.card);
    }

    parseHostConfig() {
        this.title = this.payload.title;
        this.type = this.payload.type;
        this.iconUrl = this.payload.iconUrl;
        this.data = this.payload.data;
    }

    buttonContent = () => {
        return (
            <View
                style={[
                    styles.button, this.styleConfig.actionIconFlex]}>
                {
                    !Utils.isNullOrEmpty(this.iconUrl) ?
                        <Image resizeMode="center"
                            source={{ uri: this.iconUrl }}
                            style={[styles.buttonIcon, this.styleConfig.actionIcon]} />
                        : null
                }
                <Text style={[styles.buttonTitle, this.styleConfig.fontConfig]}>
                    {this.title}
                </Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    button: {
        alignItems: Constants.CenterString,
        justifyContent: Constants.CenterString,
        padding: 10,
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: "#1D9BF6",
        borderRadius: 15,
        flexGrow: 1,
    },
    buttonTitle: {
        color: Constants.WhiteColor,
    },
    buttonIcon: {
        marginLeft: 5,
        marginRight: 10,
    },
    webViewHeader: {
        flexDirection: Constants.FlexRow,
        alignItems: Constants.CenterString,
        justifyContent: Constants.SpaceBetween,
        ...Platform.select({
            android: {
                padding: 10,
            },
            ios: {
                marginTop: 30,
                padding: 5
            }
        }),
        marginBottom: 10,
    },
    backButton: { alignItems: Constants.FlexStart, marginLeft: 20 }
});

