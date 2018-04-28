import * as React from 'react';
import PartsTable from '../PartsTable';
import ApiServices from '../../services/ApiServices';

class TablePageBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.pluralTypeName = this.__proto__.constructor.name;
    }

    getAll(){
        new ApiServices().getAll(this.pluralTypeName).then(result =>
            result.json()
        ).then(json => this.setState({ data: json }));
    }

    componentWillMount() {
        this.getAll();
    }

    delete(id){
        this.setState({data: null});
        new ApiServices().delete(id, this.pluralTypeName).then(()=>{
            this.getAll();
        });
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <PartsTable
                    columns={this.columns}
                    data={this.state.data}
                    onDeleteClick={(id) => this.delete(id)}
                    onEditClick={(item) => alert(item)}
                />
            </div>
        );
    }
}

export default TablePageBase;