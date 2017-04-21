import { observer } from 'mobx-react';
import * as React from 'react';
import View from '../view/index';
@observer
export default class Text extends React.Component<any, any> {
  static defaultProps = {
    Component: 'span',
  };
  render() {
    return <View {...this.props}/>;
  }
}
