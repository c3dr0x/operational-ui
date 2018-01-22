/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;