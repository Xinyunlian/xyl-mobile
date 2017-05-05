import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import WhiteSpaceProps from './PropsType';

@observer
export default class WhiteSpace extends Component<WhiteSpaceProps, any> {

    static defaultProps = {
        prefixCls: 'am-whitespace',
        size: 'md',
    };

    render() {
        const {prefixCls, size, className, style, onClick} = this.props;

        let wrapCls = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${size}`]: true,
            [className as string]: !!className,
        });

        return (
            <div className={wrapCls} style={style} onClick={onClick}/>
        );
    }
}
