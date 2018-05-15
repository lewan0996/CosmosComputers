import * as React from 'react';
import { Select, Loader, Button, Icon } from 'semantic-ui-react';
import ApiServices from '../../services/ApiServices';
import PartFormModal from '../PartFormModal';

class Computers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptions: [],
            columns: [],
            isLoading: true,
            isModalOpen: false,
            data: null
        };

        this.apiServices = new ApiServices();
        this.columns = [];
        // this.columns = [
        //     {
        //         displayName: "Motherboard",
        //         key: "motherboard",
        //         type: "enum",
        //         isLoading: true
        //     }
        // ];        
    }

    async componentDidMount() {
        await this.getComputerDescriptions();
        await this.getAllParts();
        this.columns.push({
            displayName: "Name",
            key: "name",
            isLoading: false
        });
        this.setState({ ...this.state, columns: this.columns, isLoading: false });
    }

    getAllParts() {
        return new Promise(async (resolve, reject) => {
            await Promise.all([
                this.getParts("Cases", "Case"),
                this.getParts("Coolers", "Cooler"),
                this.getParts("Discs", "Disc"),
                this.getParts("MemoryModules", "Memory module 1"),
                this.getParts("MemoryModules", "Memory module 2"),
                this.getParts("MemoryModules", "Memory module 3"),
                this.getParts("MemoryModules", "Memory module 4"),
                this.getParts("Motherboards", "Motherboard"),
                this.getParts("PowerSupplies", "Power supply"),
                this.getParts("Processors", "Processor"),
                this.getGraphicCards()
            ]);
            this.columns.sort((a, b) =>
                a.displayName.substring(0, a.displayName.length - 1) > b.displayName.substring(0, a.displayName.length - 1));
            resolve();
        });
    }

    async getComputerDescriptions() {
        const json = await this.apiServices.getById("descriptions", "Computers");
        console.log(json);
        this.setState({
            ...this.state,
            descriptions: json.map(desc => ({
                key: desc,
                value: desc,
                text: desc
            })),
            areDescriptionsLoading: false
        });
    }

    async getParts(pluralPartName, singularPartName) {
        const json = await this.apiServices.getAll(pluralPartName);
        const part = {
            displayName: singularPartName.charAt(0).toUpperCase() + singularPartName.slice(1),
            key: singularPartName.charAt(0).toLowerCase() + singularPartName.slice(1).replace(" ",""),
            type: "enum",
            isLoading: false,
            options: json.map(p => ({
                text: p.producer + " " + p.model + " " + (p.memoryAmount || ""),
                key: p.producer + " " + p.model,
                value: p
            }))
        };

        this.columns.push(part);
    }

    async getGraphicCards() {
        const json = await this.apiServices.getAll("GraphicsCards");
        const gpu = {
            displayName: "Graphic card",
            key: "graphicsCard",
            type: "enum",
            isLoading: false,
            options: json.map(part => ({
                text: part.chipProducer + " " + part.vendor + " " + part.model,
                key: part.chipProducer + " " + part.vendor + " " + part.model,
                value: part
            }))
        };

        this.columns.push(gpu);
    }

    async submit(element) {
        this.setState({ ...this.state, isLoading: true, isModalOpen: false });
        element.memoryModules = [
            element["memorymodule 1"],
            element["memorymodule 2"],
            element["memorymodule 3"],
            element["memorymodule 4"]
        ];
        element.description = "qwewqe";

        await this.apiServices.post("Computers", element);

        this.setState({ ...this.state, isLoading: false });
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                {this.state.isLoading
                    ?
                    <Loader active inverted style={{ margin: "0 auto", position: "relative" }}>Loading...</Loader>
                    :
                    <div>
                        <Select placeholder="Select computer..." options={this.state.descriptions} />
                        <Button icon primary onClick={() => this.setState({ ...this.state, isModalOpen: true })}>
                            <Icon name="add" />
                        </Button>
                        <PartFormModal
                            open={this.state.isModalOpen}
                            onClose={() => this.setState({ ...this.state, isModalOpen: false })}
                            columns={this.columns}
                            element={this.state.elementToEdit}
                            onSubmit={(element) => this.submit(element)}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Computers;