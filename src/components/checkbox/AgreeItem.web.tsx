import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import classNames from 'classnames';
import Checkbox from './Checkbox.web';
import {AgreeItemPropsType} from './PropsType';
import getDataAttr from '../_util/getDataAttr';
import omit from 'omit.js';

@observer
export default class AgreeItem extends Component<AgreeItemPropsType, any> {

    static defaultProps = {
        prefixCls: 'am-checkbox',
    };

    render() {
        const {prefixCls, style, className} = this.props;
        const wrapCls = classNames({
            [`${prefixCls}-agree`]: true,
            [className as string]: className,
        });

        return (<div {...getDataAttr(this.props)} className={wrapCls} style={style}>
            <Checkbox {...omit(this.props, ['style'])} className={`${prefixCls}-agree-label`}/>
        </div>);
    }
}
