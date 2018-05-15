export default class ApiServices {

    constructor() {
        this.url = "http://localhost:53203/api/";
    }

    async getById(id, pluralTypeName) {
        const response = await fetch(this.url + pluralTypeName + "/" + id);
        return await response.json();
    }

    async getAll(pluralTypeName) {
        const response = await fetch(this.url + pluralTypeName);
        return await response.json();
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