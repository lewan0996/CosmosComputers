import TablePageBase from "./TablePageBase";

class PowerSupplies extends TablePageBase {

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
                displayName: "Modular",
                key: "isModular"
            },
            {
                displayName: "Power",
                key: "power"
            }    
        ];
    }    
}

export default PowerSupplies;