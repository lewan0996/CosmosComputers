import TablePageBase from "./TablePageBase";

class Coolers extends TablePageBase{

    constructor(props) {
        super(props);
        this.state = {

        };

        this.columns = [
            {
                displayName: "Producer",
                key: "producer"
            },
            {
                displayName: "Model",
                key: "model"
            },
            {
                displayName: "Type",
                key: "type"
            }
        ];
    }    
}

export default Coolers;