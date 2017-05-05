import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import Tooltip from 'rc-tooltip';
import Item from './Item.web';
import tsPropsType from './PropsType';
import {Children, cloneElement} from "inferno-compat";

function recursiveCloneChildren(children, cb = (ch: any, _i: number) => ch) {
    return Children.map(children, (child, index) => {
        const newChild = cb(child, index);
        if (newChild && newChild.props && newChild.props.children) {
            return cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
        }
        return newChild;
    }, null);
}

@observer
export default class Popover extends Component<tsPropsType, any> {
    static defaultProps = {
        prefixCls: 'am-popover',
        placement: 'bottomRight',
        popupAlign: {overflow: {adjustY: 0, adjustX: 0}},
        trigger: ['click'],
    };
    static Item = Item;

    render() {
        const {
            overlay, onSelect = () => {
            }
        } = this.props;

        const overlayNode = recursiveCloneChildren(overlay, (child, index) => {
            const extraProps: any = {firstItem: false};
            if (child && child.type && child.type.myName === 'PopoverItem' && !child.props.disabled) {
                extraProps.onClick = () => onSelect(child, index);
                extraProps.firstItem = (index === 0);
                return cloneElement(child, extraProps);
            }
            return child;
        });
        return <Tooltip {...this.props} overlay={overlayNode}/>;
    }
}
