import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import RcCheckbox from 'rc-checkbox';
import {CheckboxProps} from './PropsType';
import omit from 'omit.js';
import classNames from 'classnames';

@observer
export default class Checkbox extends Component<CheckboxProps, any> {
    static CheckboxItem: any;
    static AgreeItem: any;
    static defaultProps = {
        prefixCls: 'am-checkbox',
        wrapLabel: true,
    };

    render() {
        const {prefixCls, className, style, children} = this.props;
        const wrapCls = classNames({
            [className as string]: !!className,
            [`${prefixCls}-wrapper`]: true,
        });
        const mark = (
            <label className={wrapCls} style={style}>
                <RcCheckbox {...omit(this.props, ['className', 'style'])} />
                {children}
            </label>
        );
        if (this.props.wrapLabel) {
            return mark;
        }
        return <RcCheckbox {...this.props} />;
    }
}
