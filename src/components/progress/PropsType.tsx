interface ProgressProps {
    percent?: number;
    position?: 'fixed' | 'normal';
    unfilled?: 'show' | 'hide';
    style?: any;
    /** rn only */
    wrapWidth?: number;
    styles?: any;
    /** web only */
    prefixCls?: string;
    appearTransition?: boolean;
    className?: string;
}

export default ProgressProps;
