import {BaseModel} from './base-model'
import { ElementType } from '../utils/enums'


export class TextBlockModel extends BaseModel {
    type = ElementType.TextBlock;
    text;
    color;
    horizontalAlignment;
    isSubtle;
    maxLines;
    size;
    weight;
    wrap;

    constructor(parent, payload) {
        super(parent, payload);
        this.text = payload.text;
        this.color = payload.color;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.isSubtle = payload.isSubtle || false;
        this.maxLines = payload.maxLines;
        this.size = payload.size;
        this.weight = payload.weight;
        this.wrap = payload.wrap || false;
    }
}

export class ImageModel extends BaseModel {
    type = ElementType.Image;
    url;
    altText;
    horizontalAlignment;
    size;
    style;

    constructor(parent, payload) {
        super(parent, payload);
        this.url = payload.url;
        this.altText = payload.altText;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.size = payload.size;
        this.style = payload.style;
    }
}

export class MediaModel extends BaseModel {
    type = ElementType.Media;
    sources = [];
    poster;
    altText;

    constructor(parent, payload) {
        super(parent, payload);

        if (payload.sources) {
            payload.sources.forEach((item) => {
                if (item) {
                    this.sources.push(item);
                }
            });
        }
        this.poster = payload.poster;
        this.altText = payload.altText;
    }
}

