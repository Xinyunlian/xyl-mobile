import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import RcDrawer from 'rc-drawer';
import tsPropsType from './PropsType';
@observer
export default class Drawer extends Component<tsPropsType, any> {
    static defaultProps = {
        prefixCls: 'am-drawer',
        enableDragHandle: false,
    };

    render() {
        return <RcDrawer {...this.props} />;
    }
}
