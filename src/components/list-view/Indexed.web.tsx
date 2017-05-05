import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import MListView from 'rmc-list-view';
import tsPropsType from './PropsType';
import handleProps from './handleProps';
const IndexedList = MListView.IndexedList;

@observer
export default class MIndexedList extends Component<tsPropsType, any> {

    static defaultProps = {
        prefixCls: 'am-indexed-list',
        listPrefixCls: 'am-list',
        listViewPrefixCls: 'am-list-view',
    };

    indexedList;
    indexedListBind = (indexedList) => {
        this.indexedList = indexedList;
    }

    render() {
        const {prefixCls, listPrefixCls} = this.props;
        const {restProps, extraProps} = handleProps(this.props, true);
        return (
            <IndexedList
                ref={this.indexedListBind}
                sectionHeaderClassName={`${prefixCls}-section-header ${listPrefixCls}-body`}
                sectionBodyClassName={`${prefixCls}-section-body ${listPrefixCls}-body`}
                {...restProps}
                {...extraProps}
            >
                {this.props.children}
            </IndexedList>
        );
    }
}
