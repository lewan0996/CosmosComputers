import * as React from 'react';
import { Select, Loader, Button, Icon } from 'semantic-ui-react';
import ApiServices from '../../services/ApiServices';
import PartFormModal from '../PartFormModal';

class Computers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptions: [],
            areDescriptionsLoading: true,
            isModalOpen: false
        };

        this.apiServices = new ApiServices();
        this.columns = [
            {
                displayName: "Motherboard",
                key: "motherboard",
                type: "enum",
                isLoading: true
            }
        ];
    }

    componentDidMount() {
        this.apiServices.getById("descriptions", "Computers")
            .then(response => response.json())
            .then(json => this.setState({
                ...this.state,
                descriptions: json.map(desc => ({
                    key: desc,
                    value: desc,
                    text: desc
                })),
                areDescriptionsLoading: false
            }));
        this.apiServices.getAll("Motherboards")
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.columns[0].options =
                    json.map(m => ({
                        text: m.producer + " " + m.model,
                        key: m.producer + " " + m.mode,
                        value: m.producer + " " + m.mode
                    }));
                this.columns[0].isLoading = false;
            });
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                {this.state.areDescriptionsLoading
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