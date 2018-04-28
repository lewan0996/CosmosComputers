import TablePageBase from "./TablePageBase";

class Discs extends TablePageBase {

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
                displayName: "Memory amount (GB)",
                key: "memoryAmount"
            },
            {
                displayName: "Type",
                key: "type"
            },
            {
                displayName: "Connector",
                key: "connector"
            }
        ];
    }   
}

export default Discs;