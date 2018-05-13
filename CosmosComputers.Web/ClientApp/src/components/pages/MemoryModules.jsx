import TablePageBase from "./TablePageBase";

class MemoryModules extends TablePageBase {

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
                displayName: "Memory amount (MB)",
                key: "memoryAmount"
            },
            {
                displayName: "Type",
                key: "type"
            },
            {
                displayName: "Price",
                key: "price"
            }
        ];
    }
}

export default MemoryModules;