function onPriceChanged(){
    console.log("OnPriceChanged triggered");
    var context = getContext();
    var collection = context.getCollection();
    var response = context.getResponse();        
    var createdDocument = response.getBody();
    var discriminator = lowerCaseFirstLetter(createdDocument.discriminator);
    
    if(discriminator==="computer"){
        return;
    }

    var computersQuery = 'SELECT * FROM Hardware h WHERE h.discriminator="Computer"';
    var computers = collection.queryDocuments(collection.getSelfLink(),computersQuery,{},updatePricesCallback);

    function updatePricesCallback(err, documents, responseOptions){        
        documents.forEach(d=>{                   
            if(discriminator==="memoryModule"){
                d.memoryModules.forEach(mm=>{
                    if(mm.id!==createdDocument.id){
                        return;
                    }
                    d.price+=createdDocument.price - mm.price;
                    mm.price = createdDocument.price;                    
                });
            } else {
                if(d[discriminator].id!==createdDocument.id){
                    return;
                }

                d.price+=createdDocument.price - d[discriminator].price;
                d[discriminator].price = createdDocument.price;               
            }            

            var accept = collection.replaceDocument(d._self,d, function(err, docReplaced){
                if(err) throw "Unable to update the document";
            });

            if(!accept){
                throw "Unable to update the document";
             }      
        });
    }

    function lowerCaseFirstLetter(word){       
        return word.charAt(0).toLowerCase() + word.slice(1);
    }
}