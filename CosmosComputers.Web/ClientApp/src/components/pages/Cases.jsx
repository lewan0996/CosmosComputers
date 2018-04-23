import * as React from 'react';
import { Table } from 'antd';

const columns = [{
    title: 'Producer',
    dataIndex: 'producer',
    key: 'producer'
}, {
    title: 'Model',
    dataIndex: 'model',
    key: 'model'
}];

const data = [{
    key: '1',
    producer: 'Fractal Design',
    model: 'Define R6'
}, {
    key: '2',
    producer: 'BeQuiet',
    model: 'Dark Base Pro 900'
}];

const Cases = (props) => (
    <div>
        Cases
        <Table columns={columns} dataSource={data} />
    </div>
);

export default Cases;