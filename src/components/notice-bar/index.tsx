import * as React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import assign from 'object-assign';
import classNames from 'classnames';
import Icon from '../icon/index';
import NoticeBarProps from './PropsType';
import Marquee from './Marquee';
import BaseComponent from '../base/BaseComponent';

@observer
export default class NoticeBar extends BaseComponent<NoticeBarProps, any> {
  @observable _state = {
    show: null,
  }

  static defaultProps = {
    prefixCls: 'am-notice-bar',
    mode: '',
    icon: <Icon type={require('./style/assets/trips.svg')} size="xxs" />,
    onClick() {},
  };

  constructor(props) {
    super(props);
    this.changeState({
      show: true,
    });
  }

  onClick = () => {
    const { mode, onClick } = this.props;
    if (onClick) {
      onClick();
    }
    if (mode === 'closable') {
      this.changeState({
        show: false,
      });
    }
  }

  render() {
    const { mode, icon, onClick, children, className, prefixCls, marqueeProps, ...restProps } = this.props;

    const extraProps: any = {};
    let operationDom: any = null;
    if (mode === 'closable') {
      operationDom = (
        <div className={`${prefixCls}-operation`} onClick={this.onClick}>
          <Icon type="cross" size="md" />
        </div>
      );
    } else {
      if (mode === 'link') {
        operationDom = (
          <div className={`${prefixCls}-operation`}>
            <Icon type="right" size="md" />
          </div>
        );
      }
      extraProps.onClick = onClick;
    }

    const wrapCls = classNames({
      [prefixCls as string]: true,
      [className as string]: !!className,
    });

    let marquee = assign({}, {
      loop: false,
      leading: 500,
      trailing: 800,
      fps: 40,
      style: {},
    }, marqueeProps);

    return this._state.show ? (
      <div className={wrapCls} {...restProps} {...extraProps}>
        { icon ? <div className={`${prefixCls}-icon`}> {icon} </div> : null }
        <div className={`${prefixCls}-content`}>
          <Marquee prefixCls={prefixCls} text={children} {...marquee} />
        </div>
        {operationDom}
      </div>
    ) : null;
  }
}
