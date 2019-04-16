import * as Utils from '../utils/util';

export class BaseModel {
    id;
    type;
    parent;
    children = [];
    payload;
    selectAction;
    isVisible = true;

    constructor(parent, payload) {
        this.parent = parent;
        this.id = payload.id;
        this.spacing = payload.spacing;
        this.separator = payload.separator;
        if (this.id === undefined) {
            this.id = Utils.generateID();
        }
        if (payload.selectAction) {
            this.selectAction = payload.selectAction;
        }
        if (payload.isVisible){
            this.isVisible = payload.isVisible;
        }
    }
}
