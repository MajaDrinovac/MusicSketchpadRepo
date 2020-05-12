import { INoteSequence } from '@magenta/music/es6';

export class Melody {
    constructor(public melody:Array<INoteSequence>, private title:String, private img){}
}
