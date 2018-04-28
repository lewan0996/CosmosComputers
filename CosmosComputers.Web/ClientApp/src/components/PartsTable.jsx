import * as React from 'react';
import { Table, Button, Icon, Loader, Segment } from 'semantic-ui-react';

const PartsTable = (props) => (
    props.data ?
        <Table inverted style={{ width: "auto", margin: "0 auto" }}>
            <Table.Header>
                <Table.Row>
                    {props.columns.map(c => (<Table.HeaderCell key={c.key}>{c.displayName}</Table.HeaderCell>))}
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.data.map((item, index1) =>
                        <Table.Row key={index1}>{props.columns.map((c, index2) =>
                            <Table.Cell key={index2}>{item[c.key]}</Table.Cell>)}
                            <Table.Cell>
                                <Button color="red" inverted onClick={() => props.onDeleteClick(item.id)}>Delete</Button>
                                <Button color="blue" inverted onClick={() => props.onEditClick(item)}>Edit</Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
            </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan={props.columns.length + 1}>
                        <Button floated='right' icon primary size='small'>
                            <Icon name='add' />
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        :
        <Loader active inverted style={{margin: "0 auto", position: "relative"}}>Loading...</Loader>
);

export default PartsTable;