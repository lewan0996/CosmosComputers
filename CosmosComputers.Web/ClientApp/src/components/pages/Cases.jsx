import TablePageBase from "./TablePageBase";

class Cases extends TablePageBase {

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
            }
        ];
    }    
}

export default Cases;