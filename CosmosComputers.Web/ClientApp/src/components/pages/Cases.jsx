import * as React from 'react';
import PartsTable from '../PartsTable';

const columns = [
    {
        displayName: "Producer",
        key: "producer"
    },
    {
        displayName: "Model",
        key: "model"
    }
];

const Cases = (props) => (
    <div>
        <PartsTable
            columns={columns}
            data={props.data}
            onDeleteClick={(id) => alert(id)}
            onEditClick={(item) => alert(item)}
        />
    </div>
);

export default Cases;