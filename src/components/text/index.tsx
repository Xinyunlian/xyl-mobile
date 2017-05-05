import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';

import View from '../view/index';
@observer
export default class Text extends Component<any, any> {
    static defaultProps = {
        Component: 'span',
    };

    render() {
        return <View {...this.props}/>;
    }
}
