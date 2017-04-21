/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import List from '../list/index';
import Radio from '../radio/Radio.web';
import BaseComponent from '../base/BaseComponent';

@observer
export default class SubMenu extends BaseComponent<any, any> {
  @observable _state = {
    selItem: null,
  }

  constructor(props) {
    super(props);
    this.changeState({
      selItem: props.selItem,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.subMenuData !== this.props.subMenuData) {
      this.changeState({
        selItem: nextProps.selItem,
      });
    }
  }
  onClick = (dataItem) => {
    this.changeState({
      selItem: [dataItem],
    });
    if (this.props.onSel) {
      this.props.onSel(dataItem);
    }
  }
  render() {
    const { subMenuPrefixCls, radioPrefixCls, subMenuData } = this.props;
    const { selItem } = this._state;

    const selected = dataItem => selItem.length > 0 && selItem[0].value === dataItem.value;

    return (
      <List style={{ paddingTop: 0 }} className={subMenuPrefixCls}>
        {subMenuData.map((dataItem, idx) => (
          <List.Item
            className={classNames({
              [`${radioPrefixCls}-item`]: true,
              [`${subMenuPrefixCls}-item-selected`]: selected(dataItem),
              [`${subMenuPrefixCls}-item-disabled`]: dataItem.disabled,
            })}
            key={idx}
            extra={<Radio
              checked={selected(dataItem)}
              disabled={dataItem.disabled}
              onChange={() => this.onClick(dataItem)}
            />}
          >
            {dataItem.label}
          </List.Item>
        ))}
      </List>
    );
  }
}
