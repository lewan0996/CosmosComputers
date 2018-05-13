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

    post(pluralTypeName, element) {        
        return fetch(this.url + pluralTypeName, {
            method: "POST",
            body: JSON.stringify(element),
            headers:{
                'Content-Type': "application/json"
            }
        });
    }

    put(pluralTypeName, element, id){
        return fetch(this.url + pluralTypeName + "/" + id, {
            method: "PUT",
            body: JSON.stringify(element),
            headers:{
                'Content-Type': "application/json"
            }
        });
    }

    delete(id, pluralTypeName) {
        return fetch(this.url + pluralTypeName + "/" + id, { method: "DELETE" });
    }
}