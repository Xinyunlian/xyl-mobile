import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import {Children} from "inferno-compat";
import Tabs, {TabPane} from 'rc-tabs';
import Tab from './Tab.web';
import TabContent from 'rc-tabs/lib/TabContent';
import TabBar from 'rc-tabs/lib/TabBar';
import getDataAttr from '../_util/getDataAttr';
import {TabBarProps, TabBarItemProps} from './PropsType';

@observer
export class Item extends Component<TabBarItemProps, any> {
    render() {
        return null;
    }
}

@observer
class AntTabBar extends Component<TabBarProps, any> {
    static defaultProps = {
        prefixCls: 'am-tab-bar',
        barTintColor: 'white',
        tintColor: '#108ee9',
        hidden: false,
        unselectedTintColor: '#888',
        placeholder: '正在加载',
    };

    public static Item = Item;

    onChange = key => {
        Children.forEach(this.props.children, (c: any) => {
            if (c.key === key && c.props.onPress) {
                c.props.onPress();
            }
        }, null);
    }

    renderTabBar = () => {
        const {barTintColor, hidden, prefixCls} = this.props;
        const barCls = hidden ? `${prefixCls}-bar-hidden` : '';
        return <TabBar className={barCls} style={{backgroundColor: barTintColor}}/>;
    }

    renderTabContent = () => {
        return <TabContent animated={false}/>;
    }

    render() {
        let activeKey;
        const children: any[] = [];
        Children.forEach(this.props.children, (c: any) => {
            if (c.props.selected) {
                activeKey = c.key;
            }
            children.push(c);
        }, null);
        const {tintColor, unselectedTintColor} = this.props;
        const panels = children.map((c: any) => {
            const cProps = c.props;
            const tab = (<Tab
                prefixCls={`${this.props.prefixCls}-tab`}
                badge={cProps.badge}
                dot={cProps.dot}
                selected={cProps.selected}
                icon={cProps.icon}
                selectedIcon={cProps.selectedIcon}
                title={cProps.title}
                tintColor={tintColor}
                unselectedTintColor={unselectedTintColor}
                dataAttrs={getDataAttr(cProps)}
            />);
            return (
                <TabPane
                    placeholder={this.props.placeholder}
                    tab={tab}
                    key={c.key}
                >
                    {cProps.children}
                </TabPane>);
        });
        return (
            <Tabs
                renderTabBar={this.renderTabBar}
                renderTabContent={this.renderTabContent}
                tabBarPosition="bottom"
                prefixCls={this.props.prefixCls}
                activeKey={activeKey}
                onChange={this.onChange}
            >
                {panels}
            </Tabs>
        );
    }
}

export default AntTabBar;
