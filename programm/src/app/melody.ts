import { INoteSequence } from '@magenta/music/es6';
import { Image } from 'p5';

export class Melody {
    constructor(public melody:Array<INoteSequence>, public title:String, public img, public color_instrument, public points){}
}
