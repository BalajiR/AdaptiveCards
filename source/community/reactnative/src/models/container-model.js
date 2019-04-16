import { BaseModel } from './base-model'
import { ModelFactory } from './model-factory';
import { ElementType } from '../utils/enums'
import {ImageModel} from './element-model'

export class AdaptiveCardModel extends BaseModel {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.AdaptiveCard;
        this.fallbackText = payload.fallbackText;
        this.version = payload.version;
        this.speak = payload.speak;
        this.children = [];
        this.actions = [];
        this.children.push(...ModelFactory.createGroup(this, payload.body));
        this.actions.push(...ModelFactory.createGroup(this, payload.actions));
        if (payload.backgroundImage) {
            this.backgroundImage = payload.backgroundImage;;
        }
        this.show = true;
    }
}

export class ContainerModel extends BaseModel {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.Container;
        this.children = [];
        this.style = payload.style;
        this.children.push(...ModelFactory.createGroup(this, payload.items));
        this.height = payload.height;
        this.verticalContentAlignment = payload.verticalContentAlignment;
        if (payload.backgroundImage) {
            this.backgroundImage = payload.backgroundImage;;
        }
    }

    get items(){
        return this.children;
    }
}

export class ColumnSetModel extends BaseModel {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.ColumnSet;
        this.children = [];
        if (payload.columns) {
            payload.columns.forEach((item) => {
                let column = new ColumnModel(this, item);
                if (column) {
                    this.children.push(column);
                }
            });
        }
        this.height = payload.height;
    }
    get columns() {
        return this.children;
    }
}

export class ColumnModel extends BaseModel {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.Column;
        this.children = [];
        this.children.push(...ModelFactory.createGroup(this, payload.items));
        this.style = payload.style;
        this.height = payload.height;
        this.verticalContentAlignment = payload.verticalContentAlignment;
        if (payload.width) {
            if (payload.width === 'auto' || payload.width === 'stretch') {
                this.width = payload.width;
            }
            else {
                let columnWidth = parseInt(payload.width, 10);
                if (columnWidth < 0) {
                    columnWidth = 0;
                }
                this.width = columnWidth;
            }
        }
        if (payload.backgroundImage) {
            this.backgroundImage = payload.backgroundImage;
        }
    }
    get items() {
        return this.children;
    }
}

export class FactModel {
    constructor(payload) {
        this.type = 'Fact';
        this.title = payload.title;
        this.value = payload.value;
    }
}

export class FactSetModel extends BaseModel {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.FactSet;
        this.children = [];
        if (payload.facts) {
            payload.facts.forEach((item) => {
                let fact = new FactModel(item);
                if (fact) {
                    this.children.push(fact);
                }
            });
        }
    }
    get facts() {
        return this.children;
    }
}

export class ImageSetModel extends BaseModel {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.ImageSet;
        this.children = [];
        this.imageSize = payload.imageSize;
        if (payload.images) {
            payload.images.forEach((item) => {
                let image = new ImageModel(this, item);
                if (image) {
                    this.children.push(image);
                }
            });
        }
    }
    get images() {
        return this.children;
    }
}

export class ActionSetModel extends BaseModel{
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.ActionSet;
        this.children = [];
        this.children.push(...ModelFactory.createGroup(this, payload.actions));
        this.height = payload.height;
        if (payload.backgroundImage) {
            this.backgroundImage = payload.backgroundImage;;
        }
    }

    get actions() {
        return this.children;
    }

}



