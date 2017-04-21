/* tslint:disable:jsx-no-multiline-js */
import * as React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import assign from 'object-assign';
import List from '../list/index';
import Flex from '../flex/index';
import SubMenu from './SubMenu.web';
import { MenuProps } from './PropsType';
import BaseComponent from '../base/BaseComponent';

@observer
export default class Menu extends BaseComponent<MenuProps, any> {
  static defaultProps = {
    prefixCls: 'am-menu',
    subMenuPrefixCls: 'am-sub-menu',
    radioPrefixCls: 'am-radio',
    data: [],
    level: 2,
    onChange: () => {},
  };
  @observable _state = {
    firstLevelSelectValue: null,
  }

  constructor(props) {
    super(props);
     this.changeState({
      firstLevelSelectValue: this.getNewFsv(props),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.changeState({
        firstLevelSelectValue: this.getNewFsv(nextProps),
      });
    }
  }

  getNewFsv(props) {
    const { value, data } = props;
    return value && value.length ? value[0] : !data[0].isLeaf ? data[0].value : '';
  }

  onClickFirstLevelItem = (dataItem) => {
    this.changeState({
      firstLevelSelectValue: dataItem.value,
    });
    if (dataItem.isLeaf && this.props.onChange) {
      this.props.onChange([dataItem.value]);
    }
  }

  onClickSubMenuItem = (dataItem) => {
    const { level, onChange } = this.props;
    setTimeout(() => {
      if (onChange) {
        onChange(level === 2 ? [this._state.firstLevelSelectValue, dataItem.value] : [dataItem.value]);
      }
    }, 300);
  }

  render() {
    const { className, style, height, data = [], prefixCls, value, level } = this.props;
    const { firstLevelSelectValue } = this._state;

    let subMenuData = data[0].children || [];
    if (level !== 2) {
      subMenuData = data;
    } else if (firstLevelSelectValue) {
      subMenuData = data.filter(dataItem => dataItem.value === firstLevelSelectValue)[0].children || [];
    }

    const subValue = value && value.length && value[value.length - 1];
    const subSelInitItem = subMenuData.filter(dataItem => dataItem.value === subValue);

    const heightStyle = {
      height: `${Math.round(height || document.documentElement.clientHeight / 2)}px`,
      overflowY: 'scroll',
    };

    return (
      <div
        className={classNames({
          [prefixCls as string]: true,
          [className as string]: !!className,
        })}
        style={assign({}, style, heightStyle)}
      >
        <Flex align="top">
          {level === 2 ? (
            <Flex.Item style={heightStyle}>
              <List>
                {data.map((dataItem, index) => (
                  <List.Item
                    className={dataItem.value === firstLevelSelectValue ? `${prefixCls}-selected` : ''}
                    onClick={() => this.onClickFirstLevelItem(dataItem)}
                    key={`listitem-1-${index}`}
                  >
                    {dataItem.label}
                  </List.Item>
                ))}
              </List>
            </Flex.Item>
          ) : null}
          <Flex.Item style={heightStyle}>
            <SubMenu
              subMenuPrefixCls={this.props.subMenuPrefixCls}
              radioPrefixCls={this.props.radioPrefixCls}
              subMenuData={subMenuData}
              selItem={subSelInitItem}
              onSel={this.onClickSubMenuItem}
            />
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
