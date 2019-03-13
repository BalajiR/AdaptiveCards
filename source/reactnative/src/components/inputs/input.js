/**
 * InputText Component.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#inputtext
 */

import React from 'react';
import {
	StyleSheet,
	TextInput,
	Text
} from 'react-native';

import { InputContextConsumer } from '../../utils/context';
import ElementWrapper from '../elements/element-wrapper';
import { StyleManager } from '../../styles/style-config';
import * as Constants from '../../utils/constants';
import { HostConfigManager } from '../../utils/host-config';
import * as Utils from '../../utils/util';
import * as Enums from '../../utils/enums';

export class Input extends React.Component {

	styleConfig = StyleManager.getManager().styles;

	constructor(props) {
		super(props);

		this.payload = props.json;
		this.id = Constants.EmptyString;
		this.isMultiline = Boolean;
		this.maxLength = 0;
		this.placeHolder = Constants.EmptyString;
		this.type = Constants.EmptyString;
		this.keyboardType = Constants.EmptyString;
		this.textStyle = Constants.EmptyString;
		this.validationText= (this.payload.validation && this.payload.validation.validationFailedText)?
							 this.payload.validation.validationFailedText : Constants.validationText;
		this.validationRequiredWithVisualCue = (!this.payload.validation || 
							Enums.ValidationNecessity.RequiredWithVisualCue == this.payload.validation.necessity);
	}

	render() {
		if (HostConfigManager.getHostConfig().supportsInteractivity === false) {
			return null;
		}
		this.parseHostConfig();

		const {
			id,
			type,
			isMultiline,
			placeholder,
			maxLength
		} = this;

		if (!id || !type) {
			return null;
		}
		
		return (
			<InputContextConsumer>
				{({ addInputItem, showErrors,inputArray }) =>{
					if(!inputArray[this.id])
						addInputItem(this.id, {value : this.props.value,errorState:this.props.isError});
					return(
						<ElementWrapper json={this.payload}>
							<TextInput
								style={this.getComputedStyles(showErrors)}
								autoCapitalize={Constants.NoneString}
								autoCorrect={false}
								placeholder={placeholder}
								multiline={isMultiline}
								maxLength={maxLength}
								underlineColorAndroid={Constants.TransparentString}
								clearButtonMode={Constants.WhileEditingString}
								textContentType={this.textStyle}
								keyboardType={this.keyboardType}
								onFocus={this.props.handleFocus}
								onBlur={this.props.handleBlur}
								value={this.props.value}
								onChangeText={(text) => this.props.textValueChanged(text, addInputItem)}
							/>
							{this.props.isError && showErrors && this.showValidationText()}
							
						</ElementWrapper>
				);}}
			</InputContextConsumer>
		);
	}

	showValidationText=()=>{
		return(
			<Text style={this.styleConfig.defaultDestructiveForegroundColor}>
				{this.validationText}
			</Text>
		)
	}

    /**
     * @description Return the input styles applicable based on the given payload
	 * @returns {Array} - Computed styles based on the config 
     */
	getComputedStyles = (showErrors) => {
		const { isMultiline } = this;

		let inputComputedStyles = [this.styleConfig.inputBorderWidth,
									this.styleConfig.inputBackgroundColor,
									this.styleConfig.inputBorderRadius,
									this.styleConfig.fontConfig,
									styles.input];
		isMultiline ?
			inputComputedStyles.push(styles.multiLineHeight) :
			inputComputedStyles.push(styles.singleLineHeight);
		this.props.isError && (showErrors || this.validationRequiredWithVisualCue) ?
			inputComputedStyles.push(this.styleConfig.borderAttention) :
			inputComputedStyles.push(this.styleConfig.inputBorderColor);

		return inputComputedStyles;
	}

    /**
     * @description Parse hostConfig specific to this element
     */
	parseHostConfig = () => {
		this.id = this.payload.id;
		this.type = this.payload.type;
		this.isMultiline = (this.payload.isMultiline !== undefined) ? this.payload.isMultiline : false;
		this.maxLength = (this.payload.maxLength == undefined ||
			this.payload.maxLength == 0) ? Number.MAX_VALUE : this.payload.maxLength;
		this.placeholder = this.payload.placeholder;
		this.textStyle = Utils.getEffectiveInputStyle(this.props.styleValue);
		this.keyboardType = Utils.getKeyboardType(this.props.styleValue);
	}
}

const styles = StyleSheet.create({
	multiLineHeight: {
		height: 88,
	},
	singleLineHeight: {
		height: 44,
	},
	input: {
		width: Constants.FullWidth,
		padding: 5,
		marginTop: 15,
	},
});


