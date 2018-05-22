import * as React from 'react';
import { Loader } from 'semantic-ui-react';
import ApiServices from '../../services/ApiServices';
import PartFormModal from '../PartFormModal';
import PartsTable from '../PartsTable';

class Computers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            computerDescriptions: [],
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
        await this.getComputers();        
        await this.getAllParts();   
        this.columns.unshift({
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
                //this.getParts("MemoryModules", "Memory module 1"),
                //this.getParts("MemoryModules", "Memory module 2"),
                //this.getParts("MemoryModules", "Memory module 3"),
                //this.getParts("MemoryModules", "Memory module 4"),
                this.getParts("Motherboards", "Motherboard"),
                this.getParts("PowerSupplies", "Power supply"),
                // this.getParts("Processors", "Processor"),
                this.getGraphicCards()
            ]);
            this.pushProcessorsColumn();
            this.pushMemoryModulesColumn();            
            this.columns.sort((a, b) => {
                if (a.displayName === "Motherboard") {
                    return -1;
                }
                if (b.displayName === "Motherboard") {
                    return 1;
                }                
                if (a.displayName > b.displayName) {
                    return 1;
                } else if (a.displayName < b.displayName) {
                    return -1;
                } else {
                    return 0;
                }
            });            
            this.pushPriceColumn();
            resolve();
        });
    }

    pushProcessorsColumn() {
        this.columns.push({
            displayName: "Processor",
            key: "processor",
            type: "enum",
            disabled: true
        });
    }

    pushPriceColumn() {
        this.columns.push({
            displayName: "Price",
            key: "price"
        });
    }

    pushMemoryModulesColumn() {
        this.columns = this.columns.concat([
            {
                displayName: "Memory module 1",
                key: "memorymodule 1",
                type: "enum",
                disabled: true
            },
            {
                displayName: "Memory module 2",
                key: "memorymodule 2",
                type: "enum",
                disabled: true
            },
            {
                displayName: "Memory module 3",
                key: "memorymodule 3",
                type: "enum",
                disabled: true
            },
            {
                displayName: "Memory module 4",
                key: "memorymodule 4",
                type: "enum",
                disabled: true
            }
        ]);
    }

    async handlePropertyChange(key, value) {
        if (key === "motherboard") {
            const processorColumnIndex = this.state.columns.findIndex(c => c.key === "processor");
            const memoryModule1Index = this.state.columns.findIndex(c => c.key === "memorymodule 1");
            const memoryModule2Index = this.state.columns.findIndex(c => c.key === "memorymodule 2");
            const memoryModule3Index = this.state.columns.findIndex(c => c.key === "memorymodule 3");
            const memoryModule4Index = this.state.columns.findIndex(c => c.key === "memorymodule 4");

            let columns = this.state.columns;

            columns[processorColumnIndex].isLoading = true;
            columns[memoryModule1Index].isLoading = true;
            columns[memoryModule2Index].isLoading = true;
            columns[memoryModule3Index].isLoading = true;
            columns[memoryModule4Index].disabled = true;

            this.setState({ ...this.state, columns });

            const compatibleProcessorsTask = this.apiServices.getProcessorsOfSocket(value.cpuSocket);
            const compatibleMemoryModulesTask = this.apiServices.getMemoryModulesOfType(value.memoryType);

            const compatibleProcessors = (await compatibleProcessorsTask).map(p => ({
                text: p.producer + " " + p.model,
                key: p.producer + " " + p.model,
                value: p
            }));
            const compatibleMemoryModules = (await compatibleMemoryModulesTask).map(m => ({
                text: m.producer + " " + m.model + " " + m.memoryAmount,
                key: m.producer + " " + m.model,
                value: m
            }));

            columns[processorColumnIndex].options = compatibleProcessors;
            columns[memoryModule1Index].options = compatibleMemoryModules;
            columns[memoryModule2Index].options = compatibleMemoryModules;
            columns[memoryModule3Index].options = compatibleMemoryModules;
            columns[memoryModule4Index].options = compatibleMemoryModules;

            columns[processorColumnIndex].disabled = false;
            columns[memoryModule1Index].disabled = false;
            columns[memoryModule2Index].disabled = false;
            columns[memoryModule3Index].disabled = false;
            columns[memoryModule4Index].disabled = false;

            columns[processorColumnIndex].isLoading = false;
            columns[memoryModule1Index].isLoading = false;
            columns[memoryModule2Index].isLoading = false;
            columns[memoryModule3Index].isLoading = false;
            columns[memoryModule4Index].isLoading = false;

            this.setState({ ...this.state, columns });
        }
    }

    async getComputers() {
        const json = await this.apiServices.getAll("Computers");       
        this.setState({
            ...this.state,
            computerDescriptions: json.map(c => ({
                key: c.name,
                value: c.name,
                text: c.name
            })),
            computers: json
        });
    }

    async getParts(pluralPartName, singularPartName) {
        const json = await this.apiServices.getAll(pluralPartName);
        const part = {
            displayName: singularPartName.charAt(0).toUpperCase() + singularPartName.slice(1),
            key: singularPartName.charAt(0).toLowerCase() + singularPartName.slice(1).replace(" ", ""),
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

        await this.apiServices.post("Computers", element);
        await this.getComputers();
        this.setState({ ...this.state, isLoading: false });
    }

    flattenComputer(computer) {
        return {
            ...computer,
            case: computer.case.producer + " " + computer.case.model,
            cooler: computer.cooler.producer + " " + computer.cooler.model,
            disc: computer.disc.producer + " " + computer.disc.model,
            graphicsCard: computer.graphicsCard.vendor + " " + computer.graphicsCard.model + " " + computer.graphicsCard.version,
            "memorymodule 1": computer.memoryModules[0].producer + " " + computer.memoryModules[0].model + " " + computer.memoryModules[0].memoryAmount,
            "memorymodule 2": computer.memoryModules[1].producer + " " + computer.memoryModules[1].model + " " + computer.memoryModules[1].memoryAmount,
            "memorymodule 3": computer.memoryModules[2].producer + " " + computer.memoryModules[2].model + " " + computer.memoryModules[2].memoryAmount,
            "memorymodule 4": computer.memoryModules[3].producer + " " + computer.memoryModules[3].model + " " + computer.memoryModules[3].memoryAmount,
            motherboard: computer.motherboard.producer + " " + computer.motherboard.model,
            powersupply: computer.powerSupply.producer + " " + computer.powerSupply.model + " " + computer.powerSupply.power,
            processor: computer.processor.producer + " " + computer.processor.model,
            name: computer.name,
            id: computer.id
        };
    }

    async delete(id) {
        this.setState({ ...this.state, isLoading: true });
        await this.apiServices.delete(id, "computers");
        await this.getComputers();
        this.setState({ ...this.state, isLoading: false });
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                {this.state.isLoading
                    ?
                    <Loader active inverted style={{ margin: "0 auto", position: "relative" }}>Loading...</Loader>
                    :
                    <div style={{ height: "100%", width: "100%", overflowX: "scroll", overflowY: "hidden" }}>
                        <PartFormModal
                            open={this.state.isModalOpen}
                            onClose={() => this.setState({ ...this.state, isModalOpen: false })}
                            columns={this.columns}
                            element={this.state.elementToEdit}
                            onSubmit={(element) => this.submit(element)}
                            onPropertyChange={async (key, value) => await this.handlePropertyChange(key, value)}
                        />
                        {this.state.computers &&

                            <PartsTable
                                columns={this.state.columns}
                                data={this.state.computers.map(c => this.flattenComputer(c))}
                                onDeleteClick={(id) => this.delete(id)}
                                onAddClick={() => this.setState({ ...this.state, isModalOpen: true })}
                                editable={false}
                            />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Computers;