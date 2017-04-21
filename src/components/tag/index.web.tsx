import React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import TagProps from './PropsType';
import Icon from '../icon/index.web';
import getDataAttr from '../_util/getDataAttr';
import BaseComponent from '../base/BaseComponent';

@observer
export default class Tag extends BaseComponent<TagProps, any> {
  static defaultProps = {
    prefixCls: 'am-tag',
    disabled: false,
    selected: false,
    closable: false,
    small: false,
    onChange() {},
    onClose() {},
    afterClose() {},
  };
  @observable _state = {
    selected: null,
    closed: false
  }

  constructor(props) {
    super(props);
    this.changeState({
      selected: props.selected,
      closed: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.changeState({
        selected: nextProps.selected,
      });
    }
  }

  onClick = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const isSelect = this.state.selected;
    this.changeState({
      selected: !isSelect,
    }, () => {
      if (onChange) {
        onChange(!isSelect);
      }
    });
  }

  onTagClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.changeState({
      closed: true,
    }, this.props.afterClose);
  }

  render() {
    const { children, className, prefixCls, disabled, closable, small, style } = this.props;
    const wrapCls = classNames({
      [className as string]: !!className,
      [`${prefixCls}`]: true,
      [`${prefixCls}-normal`]: !disabled && ( !this._state.selected || small || closable ),
      [`${prefixCls}-small`]: small,
      [`${prefixCls}-active`]: this._state.selected && !disabled && !small && !closable,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-closable`]: closable,
    });

    const closableDom = closable && !disabled && !small ? (
      <div className={`${prefixCls}-close`} onClick={this.onTagClose}>
        <Icon type="cross-circle" size="xs" />
      </div>
    ) : null;

    return !this._state.closed ? (
      <div {...getDataAttr(this.props)} className={wrapCls} onClick={this.onClick} style={style}>
        <div className={`${prefixCls}-text`}>{children}</div>
        {closableDom}
      </div>
    ) : null;
  }
}
