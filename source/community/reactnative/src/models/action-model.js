import {BaseModel} from './base-model'
import { ElementType } from '../utils/enums'
import { ModelFactory } from './model-factory'

export class SubmitActionModel extends BaseModel{
    data;
    type = ElementType.ActionSubmit;
    constructor(parent, payload) {
        super(parent, payload);
        this.data = payload.data;
        this.title = payload.title;
        this.iconUrl = payload.iconUrl;
    }
}

export class OpenUrlActionModel extends BaseModel{
    url;
    type = ElementType.ActionOpenUrl;
    constructor(parent, payload) {
        super(parent, payload);
        this.url = payload.url;
        this.title = payload.title;
        this.iconUrl = payload.iconUrl;
    }
}

export class ShowCardActionModel extends BaseModel{
    card;
    type = ElementType.ActionShowCard;
    constructor(parent, payload) {
        super(parent, payload);
        this.title = payload.title;
        this.iconUrl = payload.iconUrl;
        this.card = payload.card;
    }
}

export class ToggleVisibilityActionModel extends BaseModel{
    targetElements;
    type = ElementType.ActionToggleVisibility;
    constructor(parent, payload) {
        super(parent, payload);
        this.targetElements = payload.targetElements;
        this.title = payload.title;
        this.iconUrl = payload.iconUrl;
    }
}
