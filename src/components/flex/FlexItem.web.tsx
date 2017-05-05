import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import {FlexItemProps} from './PropsType';

@observer
export default class FlexItem extends Component<FlexItemProps, any> {

    static defaultProps = {
        prefixCls: 'am-flexbox',
    };

    render() {
        let {children, className, prefixCls, style, onClick} = this.props;
        const wrapCls = classNames({
            [`${prefixCls}-item`]: true,
            [className as string]: className,
        });
        return (
            <div className={wrapCls} style={style} onClick={onClick}>{children}</div>
        );
    }
}
