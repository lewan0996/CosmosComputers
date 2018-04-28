export default class ApiServices {

    constructor() {
        this.url = "http://localhost:53203/api/";
    }

    getById(id, pluralTypeName) {
        return fetch(this.url + pluralTypeName + "/" + id);
    }

    getAll(pluralTypeName) {
        return fetch(this.url + pluralTypeName);
    }

    delete(id, pluralTypeName) {
        return fetch(this.url + pluralTypeName + "/" + id, { method: "DELETE" });
    }
}