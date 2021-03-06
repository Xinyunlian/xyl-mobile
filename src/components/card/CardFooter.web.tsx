import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';

export interface CardFooterProps {
    prefixCls?: string;
    content?: any;
    className?: string;
    extra?: any;
}

@observer
export default class CardFooter extends Component <CardFooterProps, any> {
    static defaultProps = {
        prefixCls: 'am-card',
    };

    render() {
        const {prefixCls, content, className, extra, ...restProps} = this.props;
        const wrapCls = classNames({
            [`${prefixCls}-footer`]: true,
            [className as string]: className,
        });

        return (
            <div className={wrapCls} {...restProps}>
                <div className={`${prefixCls}-footer-content`}>{content}</div>
                { extra && <div className={`${prefixCls}-footer-extra`}>{extra}</div> }
            </div>
        );
    }
}
