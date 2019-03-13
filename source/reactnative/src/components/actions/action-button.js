/**
 * Actions Component.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#schema-action.openurl
 */

import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback
} from 'react-native';

import { StyleManager } from '../../styles/style-config';
import * as Utils from '../../utils/util';
import { InputContextConsumer, InputContext } from '../../utils/context';
import * as Constants from '../../utils/constants';
import { HostConfigManager } from '../../utils/host-config';


export class ActionButton extends React.Component {

	styleConfig = StyleManager.getManager().styles;
	static contextType = InputContext;

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

	componentDidMount(){
		if(!Utils.isNullOrEmpty(this.payload.iconUrl)){
			this.context.addResourceInformation(this.payload.iconUrl,"");
		}
	}

	render() {
		if (HostConfigManager.getHostConfig().supportsInteractivity === false) {
			return null;
		}
		this.parseHostConfig();
		
		const ButtonComponent = Platform.OS === Constants.PlatformIOS ? TouchableOpacity : TouchableNativeFeedback;

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
		let mergedObject = {};
		for (const key in inputItem) {
			if (inputItem.hasOwnProperty(key)) {
				mergedObject[key]=inputItem[key].value;
			}
		}
		if (this.data !== null) {
			if(this.data instanceof Object)
				mergedObject = {...mergedObject,...this.data}
			else
				mergedObject["actionData"]=this.data;
		} 
		let actionObject = { "type": this.payload.type, "data": mergedObject };
		onExecuteAction(actionObject,this.payload.ignoreInputValidation === true);
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
		let imageUrl = this.payload.iconUrl
		this.iconUrl = Utils.getImageUrl(imageUrl)
		this.data = this.payload.data;
	}
	
    /**
     * @description Return the button styles applicable
	 * @returns {Array} computedStyles - Styles based on the config
     */
	getButtonStyles = () => {
		let computedStyles = [this.styleConfig.buttonBackgroundColor,
								this.styleConfig.buttonBorderRadius,
								this.styleConfig.actionIconFlex,
								styles.button];

		return computedStyles;
	}

	buttonContent = () => {
		let titleStyles = [this.styleConfig.fontConfig, 
							this.styleConfig.buttonTitleColor, 
							this.styleConfig.buttonTitleTransform];

		return (
			<View
				style={this.getButtonStyles()}>
				{
					!Utils.isNullOrEmpty(this.iconUrl) ?
						<Image resizeMode="center"
							source={{ uri: this.iconUrl }}
							style={[styles.buttonIcon, this.styleConfig.actionIcon]} />
						: null
				}
				<Text style={titleStyles}>
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
		flexGrow: 1,
	},
	buttonIcon: {
		marginLeft: 5,
		marginRight: 10,
	}
});

