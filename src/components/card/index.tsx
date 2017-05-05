import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import CardHeader from './CardHeader.web';
import CardBody from './CardBody.web';
import CardFooter from './CardFooter.web';

export interface CardProps {
    prefixCls?: string;
    className?: string;
    full?: boolean;
}
@observer
export default class Card extends Component <CardProps, any> {
    static defaultProps = {
        prefixCls: 'am-card',
        full: false,
    };

    static Header = CardHeader;
    static Body = CardBody;
    static Footer = CardFooter;

    render() {
        const {prefixCls, full, className, ...resetProps} = this.props;
        const wrapCls = classNames({
            [prefixCls as string]: true,
            [`${prefixCls}-full`]: full,
            [className as string]: className,
        });

        return (
            <div className={wrapCls} {...resetProps} />
        );
    }
}
