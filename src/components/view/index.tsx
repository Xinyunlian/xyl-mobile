import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import assign from 'object-assign';

@observer
export default class View extends Component<any, any> {
    static defaultProps = {
        Component: 'div',
    };

    render() {
        const props = assign({}, this.props);
        if (Array.isArray(props.style)) {
            const style = {};
            props.style.forEach(s => {
                assign(style, s);
            });
            props.style = style;
        }
        const {Component} = props;
        return <Component {...props}/>;
    }
}
