import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import RcCollapse, {Panel} from 'rc-collapse';
import AccordionProps from './PropsType';

@observer
export default class Accordion extends Component<AccordionProps, any> {
    static Panel = Panel;

    static defaultProps = {
        prefixCls: 'am-accordion',
    };

    render() {
        return <RcCollapse {...this.props} />;
    }
}
