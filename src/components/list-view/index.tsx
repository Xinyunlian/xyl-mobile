import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import MListView from 'rmc-list-view';
import tsPropsType from './PropsType';
import handleProps from './handleProps';
import IndexedList from './Indexed.web';

@observer
export default class ListView extends Component<tsPropsType, any> {
    static defaultProps = {
        prefixCls: 'am-list-view',
        listPrefixCls: 'am-list',
    };
    static DataSource = MListView.DataSource;
    static IndexedList = IndexedList;

    render() {
        const {restProps, extraProps} = handleProps(this.props, false);
        let {useZscroller, refreshControl} = this.props;
        if (refreshControl) {
            useZscroller = true;
        }
        return <MListView ref="listview" {...restProps} {...extraProps} useZscroller={useZscroller}/>;
    }
}
