import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
export interface CardBodyProps {
    prefixCls?: string;
    children?: any;
    className?: string;
    style?: {};
}
@observer
export default class CardBody extends Component<CardBodyProps, any> {
    static defaultProps = {
        prefixCls: 'am-card',
    };

    render() {
        const {prefixCls, className, ...restProps} = this.props;
        const wrapCls = classNames({
            [`${prefixCls}-body`]: true,
            [className as string]: className,
        });

        return (
            <div className={wrapCls} {...restProps} />
        );
    }
}
