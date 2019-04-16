import {BaseModel} from './base-model'
import { ElementType } from '../utils/enums'

export class BaseInputModel extends BaseModel{
    constructor(parent, payload) {
        super(parent, payload);
        this.placeholder = payload.placeholder;
        this.value = payload.value;
        this.inlineAction = payload.inlineAction;
    }
}

export class TextInputModel extends BaseInputModel {
    type = ElementType.TextInput;
    isMultiline;
    maxLength;
    style;

    constructor(parent, payload) {
        super(parent, payload);

        this.value = payload.value;
        if (this.value === undefined) {
            this.value = '';
        }
        this.isMultiline = payload.isMultiline || false;
        this.maxLength = payload.maxLength;
        this.style = payload.style;
    }

}

export class NumberInputModel extends BaseInputModel {
    type = ElementType.NumberInput;
    max;
    min;

    constructor(parent, payload) {
        super(parent, payload);

        this.value = payload.value;

        if (this.value !== undefined) {
            let str = this.value.toString();
            this.value = str;
        } else {
            this.value = '';
        }
            
        this.max = payload.max;
        this.min = payload.min;
    }
}

export class DateInputModel extends BaseInputModel {
    type = ElementType.DateInput;
    max;
    min;

    constructor(parent, payload) {
        super(parent, payload);

        this.value = payload.value;
        this.max = payload.max;
        this.min = payload.min;
    }
}

export class TimeInputModel extends BaseInputModel {
    type = ElementType.TimeInput;
    max;
    min;

    constructor(parent, payload) {
        super(parent, payload);

        this.value = payload.value;
        this.max = payload.max;
        this.min = payload.min;
    }

}

export class ToggleInputModel extends BaseInputModel {
    type = ElementType.ToggleInput;
    title;
    valueOff;
    valueOn;

    constructor(parent, payload) {
        super(parent, payload);

        this.title = payload.title;
        this.valueOff = payload.valueOff;
        this.valueOn = payload.valueOn;
        this.value = payload.value === payload.valueOn;
    }
}

export class ChoiceSetModel extends BaseInputModel {
    type = ElementType.ChoiceSetInput;
    isMultiSelect;
    style;

    constructor(parent, payload) {
        super(parent, payload);

        this.isMultiSelect = payload.isMultiSelect;
        this.style = payload.style;

        if (payload.choices) {
            payload.choices.forEach((item, index) => {
                let choice = new ChoiceModel(this, item);
                if (choice) {
                    this.children.push(choice);
                }
            });
        }

        if (payload.value) {
            let selected = (payload.value).split(',');
            if (selected) {
                selected.forEach(current => {
                    let choice = this.choices.find(c => c.value === current);
                    if (choice) {
                        choice.selected = true;
                    }
                });
            }
        }
    }

    get choices() {
        return this.children;
    }


}

export class ChoiceModel extends BaseInputModel {
    parent;
    type = 'Input.Choice';
    title;
    value;
    selected;

    constructor(parent, payload) {
        super(parent, payload);

        this.title = payload.title;
        this.value = payload.value;
        this.selected = false;
    }
}









