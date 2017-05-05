import {VNode} from "inferno";
interface ResultProps {
    style?: any;
    imgUrl?: string;
    img?: VNode;
    title?: VNode;
    message?: VNode;
    buttonText?: string;
    buttonType?: 'primary' | 'ghost';
    buttonClick?: () => void;
    /** below web only */
    prefixCls?: string;
    className?: string;
    /** below rn only */
    styles?: any;
}

export default ResultProps;
