import * as React from 'react';
import PartsTable from '../PartsTable';

const data = [
    {
        producer: "Fractal Design",
        model: "Define R6"
    },
    {
        producer: "BeQuiet",
        model: "Dark Base Pro 900"
    }
];

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
            data={data}
            onDeleteClick={(id) => alert(id)}
            onEditClick={(item) => alert(item)}
        />
    </div>
);

export default Cases;