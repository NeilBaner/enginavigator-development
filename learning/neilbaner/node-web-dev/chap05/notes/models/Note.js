const _note_key = Symbol('key');
const _note_title = Symbol('title');
const _note_body = Symbol('body');

module.exports = class Note {
    constructor(key, title, body) {
        this[_note_key] = key;
        this[_note_title] = title;
        this[_note_body] = body;
    }

    get key() {
        return this[_note_key];
    }
    get title() {
        return this[_note_title];
    }
    get body(){
        return this[_note_body];
    }

    set title(newTitle){
        this[_note_title] = newTitle;
    }
    set body(newBody){
        this[_note_body] = newBody;
    }
}