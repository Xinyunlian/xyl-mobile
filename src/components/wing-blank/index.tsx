import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import WingBlankProps from './PropsType';

@observer
export default class WingBlank extends Component<WingBlankProps, any> {
    static defaultProps = {
        prefixCls: 'am-wingblank',
        size: 'lg',
    };

    render() {
        const {prefixCls, size, className, children, style} = this.props;
        let wrapCls = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${size}`]: true,
            [className as string]: !!className,
        });

        return (
            <div className={wrapCls} style={style}>
                {children}
            </div>
        );
    }
}
