class ApiServices{

    constructor(){
        this.url = "http://localhost:53203/api/";
    }

    async static getById(id, pluralTypeName){
        return await fetch(this.url + pluralTypeName + "/" + id);
    }

    async static getAll(pluralTypeName){
        return await fetch(this.url + pluralTypeName);
    }
    
}