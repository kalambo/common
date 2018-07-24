import { Scalar } from 'rgo';
export declare const transformValue: (value: any, transform?: "email" | "url" | undefined) => any;
export interface Rules {
    equals?: any;
    email?: true;
    password?: true;
    transform?: 'email' | 'url';
    maxWords?: number;
    minChoices?: number;
    maxChoices?: number;
    lt?: string;
    gt?: string;
    options?: any[] | {
        [key: string]: any;
    };
    other?: any;
}
export default function isValid(rules: {
    scalar: Scalar;
    optional?: boolean;
} & Rules, value: any, values: {
    [key: string]: any;
}): boolean;
