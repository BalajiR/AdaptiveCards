import React from 'react';

import {
	DateInput,
	TimeInput,
	ToggleInput,
	NumberInput,
	ChoiceSetInput,
	InputText,
} from '../inputs';
import {
	TextBlock,
	Media,
	Img
} from '../elements';
import {
	Container,
	ColumnSet,
	Column,
	FactSet,
	ImageSet
} from '../containers';
import { ActionButton } from '../actions';
import * as Enums from '../../utils/enums';
import * as Utils from '../../utils/util';

export class Registry {

	static registryInstance = null;

	static getManager() {
		if (!Registry.registryInstance) {
			Registry.registryInstance = new Registry();
		}
		return Registry.registryInstance;
	}

	/**
	 * @description Register a new Component or Override an Existing Component
	 * @param {string} key - Type of the Component to be overridden
	 * @param {Component} component - React Native component to be rendered
	 */
	registerComponent = (key, component) => {
		this.ElementRegistry[key] = component;
	}

	/**
	 * @description Remove an Existing Component
	 * @param {string} key - Type of the Component to be removed
	 */
	removeComponent = (key) => {
		delete this.ElementRegistry[key];
	}

	ElementRegistry = {
		'Container': Container,
		'ColumnSet': ColumnSet,
		'ImageSet': ImageSet,
		'Column': Column,
		'FactSet': FactSet,

		'Input.Text': InputText,
		'Input.Number': NumberInput,
		'Input.Toggle': ToggleInput,
		'Input.Date': DateInput,
		'Input.Time': TimeInput,
		'Input.ChoiceSet': ChoiceSetInput,

		'TextBlock': TextBlock,
		'Media': Media,
		'Image': Img,

		'Action.ShowCard': ActionButton,
		'Action.Submit': ActionButton,
		'Action.OpenUrl': ActionButton,
		'Action.ToggleVisibility': ActionButton
	};

	/**
	 * @description Get then component associated for the given element type
	 * @param {string} type - Type of the element
	 */
	getComponentOfType = (type) => {
		return this.ElementRegistry[type];
	}

	/**
	 * @description Register a required property for custom/overriding components
	 * @param {string} key - Type of the Component
	 * @param {requiredProps} component - Required properties of the custom component
	 */
	registerRequiredPropertySchema = (key, requiredProps) => {
		if (this.ElementRegistry.hasOwnProperty(key) && !Utils.isNullOrEmpty(requiredProps)) {
			this.RequiredPropertySchema[key] = requiredProps;

		}
	}
	RequiredPropertySchema = {
		'Container': { 'type': 'Container', 'items': 'Array' },
		'ColumnSet': { 'type': 'ColumnSet' },
		'Column': { 'items': 'Array' },
		'FactSet': { 'type': 'FactSet', 'facts': 'Array' },
		'ImageSet': { 'type': 'ImageSet', 'images': 'Array' },

		'TextBlock': { 'type': 'TextBlock' },
		'Image': { 'type': 'Image', 'url': 'String' },
		'Media': { 'type': 'Media' },

		'Input.Text': { 'type': 'Input.Text', 'id': 'String' },
		'Input.Number': { 'type': 'Input.Number', 'id': 'String' },
		'Input.Toggle': { 'type': 'Input.Toggle', 'id': 'String' },
		'Input.Date': { 'type': 'Input.Date', 'id': 'String' },
		'Input.Time': { 'type': 'Input.Time', 'id': 'String' },
		'Input.ChoiceSet': { 'type': 'Input.ChoiceSet', 'id': 'String' },


		'Action.ShowCard': { 'type': 'Action.ShowCard', 'card': 'Object' },
		'Action.Submit': { 'type': 'Action.Submit' },
		'Action.OpenUrl': { 'type': 'Action.OpenUrl', 'url': 'String' }
	};

	/**
	 * @description validate the schema for the given element type
	 * @param {string} type - Type of the element
	 */
	validateSchemaForType = (type) => {
		return this.RequiredPropertySchema[type];
	}

	/**
	 * @description Parse an Array of components
	 * @param {Array} componentArray - Json
	 */
	parseRegistryComponents = (componentArray, onParseError) => {
		const parsedElement = [];
		if (!componentArray)
			return parsedElement;
		componentArray.map((element, index) => {
			const Element = this.getComponentOfType(element.type);
			if (Element) {
                /**
                 * Validate the schema and invoke onParseError handler incase of any error.
                 */
				let isValid = true;
				for (var key in this.validateSchemaForType(element.type)) {
					if (!element.hasOwnProperty(key)) {
						let error = { "error": Enums.ValidationError.PropertyCantBeNull, "message": `Required property ${key} for ${element.type} is missing` };
						onParseError(error);
						isValid = false;
					}
				}
				if (isValid) {
					if (element.isVisible !== false) {
					if(!Utils.isNullOrEmpty(element.id)){
						parsedElement.push(<Element json={element} key={`${element.type}-${index}-${element.id}`} />);
					}
					else{
						parsedElement.push(<Element json={element} key={`${element.type}-${index}`} />);
					}
				}
					
					
				}
			} else {
				let error = { "error": Enums.ValidationError.UnknownElementType, "message": `Unknown Type ${element.type} encountered` };
				onParseError(error);
				return null;
			}
		});
		return parsedElement;
	}

	/**
	 * @description Generates a random number
	 */
	generateNumber = () => {
		min = 1;
		max = 100000;
		const rndNum = Math.floor(Math.random() * (max - min + 1) + min)
		return rndNum
	};
}




