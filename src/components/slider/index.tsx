import { observer } from 'mobx-react';
import * as React from 'react';
import RcSlider from 'rc-slider/lib/Slider';
import SliderProps from './PropsType';
@observer
export default class Slider extends React.Component<SliderProps, any> {
  static defaultProps = {
    prefixCls: 'am-slider',
  };
  render() {
    return (
      <div className={`${this.props.prefixCls}-wrapper`}><RcSlider {...this.props} /></div>
    );
  }
}
