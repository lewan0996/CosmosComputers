import * as React from 'react';
import { Form, Segment, Button, Select, Input } from 'semantic-ui-react';

class PartForm extends React.Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            element: props.element || {},
            errors: {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ ...this.state, element: props.element });
    }

    setFieldContent(field, content) {
        let element = this.state.element;
        element[field] = content;
        this.setState({ element });
        if (!content) {
            this.setState({ ...this.state, errors: { ...this.state.errors, [field]: true } });
        } else {
            this.setState({ ...this.state, errors: { ...this.state.errors, [field]: false } });
        }
    }

    isFormValid(state) {
        return this.props.columns.every(column =>
            state.element[column.key] !== ""
            && state.element[column.key] !== null
            && state.element[column.key] !== undefined); //false and 0 are ok
    }

    submit(state) {
        if (this.isFormValid(state)) {
            this.props.onSubmit(this.state.element);
        }
    }

    render() {
        return (
            <Segment inverted>
                <Form inverted onSubmit={() => this.submit(this.state)}>
                    {this.props.columns.map(column =>
                        <Form.Field key={column.key}>
                            <label>{column.displayName}</label>
                            <Form.Field
                                control={column.type === "boolean" || column.type === "enum" ? Select : Input}
                                options={
                                    column.type === "boolean" ?
                                        [{ key: true, text: "Yes", value: true }, { key: false, text: "No", value: false }]
                                        : column.options
                                }
                                placeholder={column.displayName}
                                onChange={(event, content) => this.setFieldContent(column.key, content.value)}
                                error={this.state.errors[column.key]}
                                value={this.state.element[column.key]}
                            />

                        </Form.Field>)

                    }
                    <Button
                        type='submit'
                        color='green'
                        disabled={!this.isFormValid(this.state)}>
                        Submit
                      </Button>
                </Form>
            </Segment>
        );
    }
}

export default PartForm;