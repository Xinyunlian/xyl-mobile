import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import Icon from '../icon/index';
import NavBarProps from './PropsType';

@observer
export default class NavBar extends Component<NavBarProps, any> {
    static defaultProps = {
        prefixCls: 'am-navbar',
        mode: 'dark',
        iconName: 'left',
        onLeftClick() {
        },
    };

    render() {
        const {
            prefixCls, className, children, mode, iconName, leftContent, rightContent, onLeftClick,
            ...restProps,
        } = this.props;

        const wrapCls = classNames({
            [className as string]: className,
            [prefixCls as string]: true,
            [`${prefixCls}-${mode}`]: true,
        });

        return (
            <div {...restProps} className={wrapCls}>
                <div className={`${prefixCls}-left`} onClick={onLeftClick}>
                    {iconName ? <span className={`${prefixCls}-left-icon`}><Icon type={`${iconName}`}/></span> : null}
                    <span className={`${prefixCls}-left-content`}>{leftContent}</span>
                </div>
                <div className={`${prefixCls}-title`}>{children}</div>
                <div className={`${prefixCls}-right`}>
                    {rightContent}
                </div>
            </div>
        );
    }
}
