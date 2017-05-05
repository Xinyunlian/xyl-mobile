import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
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
