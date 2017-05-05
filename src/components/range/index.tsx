import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import RcRange from 'rc-slider/lib/Range';
import RangeProps from './PropsType';

@observer
export default class Range extends Component<RangeProps, any> {
    static defaultProps = {
        prefixCls: 'am-slider',
    };

    render() {
        return (
            <div className={`${this.props.prefixCls}-wrapper`}><RcRange {...this.props} /></div>
        );
    }
}
