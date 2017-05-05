import {VNode} from "inferno";

export interface ListProps {
    /** web only */
    prefixCls?: string;
    style?: any;
    /** web only */
    className?: string;
    children?: any;
    renderHeader?: Function;
    renderFooter?: Function;
    /** rn only */
    styles?: any;
}

export interface ListItemProps {
    last?: boolean;
    /** web only */
    prefixCls?: string;
    style?: any;
    activeStyle?: any;
    /** web only */
    className?: string;
    thumb?: VNode | null;
    extra?: VNode;
    arrow?: 'horizontal' | 'down' | 'up' | 'empty' | '';
    align?: 'top' | 'middle' | 'bottom';
    onClick?: (e?: any) => void;
    error?: boolean;
    multipleLine?: boolean;
    children?: any;
    wrap?: boolean;
    disabled?: boolean;
    line?: number;
    platform?: string;
    /** rn only */
    styles?: any;
    onPressIn?: (e?: any) => void;
    onPressOut?: (e?: any) => void;
}

export interface BriefProps {
    style?: any;
    children?: any;
    wrap?: boolean;
    /** rn only */
    styles?: any;
}
