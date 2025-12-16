// src/types/heroicons.d.ts
import { DefineComponent, SVGAttributes } from 'vue';

type IconProps = {
    class?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
} & SVGAttributes<SVGElement>;

declare module '@heroicons/vue/outline' {
    export const CheckCircleIcon: DefineComponent<IconProps>;
    export const XCircleIcon: DefineComponent<IconProps>;
    export const InformationCircleIcon: DefineComponent<IconProps>;
    export const ExclamationIcon: DefineComponent<IconProps>;
    // Add other outline icons you need
}

// This is important - it tells TypeScript to treat the module as a module
declare module '@heroicons/vue/outline/*' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<IconProps>;
    export default component;
}

declare module '@heroicons/vue/solid' {
    // Add solid icons if needed
}

// This is important - it tells TypeScript to treat the module as a module
declare module '@heroicons/vue/solid/*' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<IconProps>;
    export default component;
}