/* tslint:disable:jsx-no-multiline-js */
import * as React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import Button from '../button/index';
import Flex from '../flex/index';
import PaginationProps from './PropsType';
import { getComponentLocale } from '../_util/getLocale';
import BaseComponent from '../base/BaseComponent';

export default class Pagination extends BaseComponent<PaginationProps, any> {
  static defaultProps = {
    prefixCls: 'am-pagination',
    mode: 'button',
    current: 0,
    simple: false,
    onChange: () => { },
  };
  @observable _state = {
    current: null,
  }
  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.changeState({
      current: props.current,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.changeState({
      current: nextProps.current,
    });
  }

  onChange(p) {
    this.changeState({
      current: p,
    });
    if (this.props.onChange) {
      this.props.onChange(p);
    }
  }

  render() {
    const { prefixCls, className, style, mode, total, simple } = this.props;
    const current = this._state.current;
    const locale = getComponentLocale(this.props, this.context, 'Pagination', () => require('./locale/zh_CN'));
    const { prevText, nextText } = locale;

    let markup = (
      <Flex>
        <Flex.Item className={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-prev`}>
          <Button inline disabled={current <= 0} onClick={() => this.onChange(current - 1)}>{prevText}</Button>
        </Flex.Item>
        {this.props.children ? (<Flex.Item>{this.props.children}</Flex.Item>) : (!simple &&
          <Flex.Item className={`${prefixCls}-wrap`}>
            <span className="active">{current + 1}</span>/<span>{total}</span>
          </Flex.Item>)
        }
        <Flex.Item className={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-next`}>
          <Button
            inline
            disabled={current >= total - 1}
            onClick={() => this.onChange(this._state.current + 1)}
          >
            {nextText}
          </Button>
        </Flex.Item>
      </Flex>
    );
    if (mode === 'number') {
      markup = (
        <div className={`${prefixCls}-wrap`}>
          <span className="active">{current + 1}</span>/<span>{total}</span>
        </div>
      );
    } else if (mode === 'pointer') {
      const arr: any = [];
      for (let i = 0; i < total; i++) {
        arr.push(
          <div
            key={`dot-${i}`}
            className={classNames({
              [`${prefixCls}-wrap-dot`]: true,
              [`${prefixCls}-wrap-dot-active`]: i === current,
            })}
          >
            <span />
          </div>,
        );
      }
      markup = <div className={`${prefixCls}-wrap`}>{arr}</div>;
    }
    return (
      <div
        className={classNames({ [className as string]: className, [prefixCls as string]: true })}
        style={style}
      >
        {markup}
      </div>
    );
  }
}
