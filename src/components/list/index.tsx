import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import Item from './ListItem.web';
import classNames from 'classnames';
import {ListProps} from './PropsType';

@observer
export default class List extends Component<ListProps, any> {
    static Item = Item;

    static defaultProps = {
        prefixCls: 'am-list',
    };

    render() {
        let {prefixCls, children, className, style, renderHeader, renderFooter} = this.props;
        const wrapCls = classNames({
            [prefixCls as string]: true,
            [className as string]: className,
        });

        return (
            <div className={wrapCls} style={style}>
                {renderHeader ? (<div className={`${prefixCls}-header`}>
                    {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
                </div>) : null}
                {children ? (<div className={`${prefixCls}-body`}>{children}</div>) : null}
                {renderFooter ? (<div className={`${prefixCls}-footer`}>
                    {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
                </div>) : null}
            </div>
        );
    }
}
