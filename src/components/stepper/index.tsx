import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import StepProps from './PropsType';
import Icon from '../icon/index';

@observer
export default class Stepper extends Component<StepProps, any> {

    static defaultProps = {
        prefixCls: 'am-stepper',
        step: 1,
        readOnly: false,
        showNumber: false,
        focusOnUpDown: false,
        useTouch: true,
    };

    inputNumber;
    inputNumberBind = (inputNumber) => {
        this.inputNumber = inputNumber;
    }

    render() {
        const {className, showNumber, ...restProps} = this.props;
        const stepperClass = classNames({
            [className as string]: !!className,
            ['showNumber']: !!showNumber,
        });

        return (
            <RcInputNumber
                upHandler={<Icon type={require('./style/assets/plus.svg')} size="xxs"/>}
                downHandler={<Icon type={require('./style/assets/minus.svg')} size="xxs"/>}
                {...restProps}
                ref={this.inputNumberBind}
                className={stepperClass}
            />
        );
    }
}
