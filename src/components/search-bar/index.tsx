import * as React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import { SearchBarProps, SearchBarState, defaultProps } from './PropsType';
import BaseComponent from '../base/BaseComponent';

export default class SearchBar extends BaseComponent<SearchBarProps, SearchBarState> {
  static defaultProps = defaultProps;
  refs: any;
  rightBtnInitMarginleft: any;
  firstFocus: any;
  scrollIntoViewTimeout: any;
  
  @observable _state = {
    value: null,
    focus: false,
    focused: false,
  }

  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value || '';
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      value = '';
    }
    this.changeState({
      value,
      focus: false,
      focused: props.focused || false,
    });
  }

  componentDidMount() {
    const initBtn = window.getComputedStyle(this.refs.rightBtn);
    this.rightBtnInitMarginleft = initBtn['margin-left'];
    if (this.props.autoFocus || this._state.focused) {
      (this.refs as any).searchInput.focus();
    }
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
    if (this.refs.searchInputContainer.className.indexOf(`${this.props.prefixCls}-start`) > -1) {
      const realWidth = this.refs.syntheticPhContainer.getBoundingClientRect().width; // 包含小数
      this.refs.syntheticPh.style.width = `${Math.ceil(realWidth)}px`;
      if (!this.props.showCancelButton) {
        this.refs.rightBtn.style.marginRight = 0;
      }
    } else {
      this.refs.syntheticPh.style.width = '100%';
      if (!this.props.showCancelButton) {
        this.refs.rightBtn.style.marginRight =
          `-${this.refs.rightBtn.offsetWidth + parseInt(this.rightBtnInitMarginleft, 10)}px`;
      }
    }
    if (this._state.focused) {
      (this.refs as any).searchInput.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.changeState({
        value: nextProps.value,
      });
    }
    if ('focused' in nextProps) {
      this.changeState({
        focused: nextProps.focused,
      });
    }
  }

  componentWillUnmount() {
    if (this.scrollIntoViewTimeout) {
      clearTimeout(this.scrollIntoViewTimeout);
      this.scrollIntoViewTimeout = null;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this._state.value);
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    if (!('value' in this.props)) {
      this.changeState({ value });
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onFocus = () => {
    this.changeState({
      focus: true,
    });
    this.firstFocus = true;

    if (!('focused' in this.props)) {
      this.changeState({
        focused: true,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus();
    }

    if (document.activeElement.tagName.toLowerCase() === 'input') {
      this.scrollIntoViewTimeout = setTimeout(() => {
        try {
          (document.activeElement as any).scrollIntoViewIfNeeded();
        } catch (e) { }
      }, 100);
    }
  };

  onBlur = () => {
    setTimeout(() => {
      this.changeState({
        focus: false,
      });
    }, 0);
    if (!('focused' in this.props)) {
      this.changeState({
        focused: false,
      });
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onClear = () => {
    if (!('value' in this.props)) {
      this.changeState({ value: '' });
    }
    (this.refs as any).searchInput.focus();
    if (this.props.onClear) {
      this.props.onClear('');
    }
    if (this.props.onChange) {
      this.props.onChange('');
    }
  }

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel(this._state.value);
    } else {
      this.onClear();
    }
    (this.refs as any).searchInput.blur();
  }

  render() {
    const {
      prefixCls, showCancelButton, disabled, placeholder,
      cancelText, className,
    } = this.props;

    const { value, focus } = this._state;

    const wrapCls = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-start`]: focus || value && value.length > 0,
      [className as string]: className,
    });

    const clearCls = classNames({
      [`${prefixCls}-clear`]: true,
      [`${prefixCls}-clear-show`]: focus && value && value.length > 0,
    });

    const cancelCls = classNames({
      [`${prefixCls}-cancel`]: true,
      [`${prefixCls}-cancel-show`]: showCancelButton || focus || value && value.length > 0,
      [`${prefixCls}-cancel-anim`]: this.firstFocus,
    });

    return (
      <form onSubmit={this.onSubmit} className={wrapCls} ref="searchInputContainer">
        <div className={`${prefixCls}-input`}>
          <div className={`${prefixCls}-synthetic-ph`} ref="syntheticPh">
            <span className={`${prefixCls}-synthetic-ph-container`} ref="syntheticPhContainer">
              <i className={`${prefixCls}-synthetic-ph-icon`}/>
              <span
                className={`${prefixCls}-synthetic-ph-placeholder`}
                style={{visibility: placeholder && !value ? 'visible' : 'hidden'}}
              >
                {placeholder}
              </span>
            </span>
          </div>
          <input
            type="search"
            className={`${prefixCls}-value`}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref="searchInput"
          />
          <a onClick={this.onClear} className={clearCls} />
        </div>
        <div className={cancelCls} onClick={this.onCancel} ref="rightBtn">
          {cancelText}
        </div>
      </form>
    );
  }
}
