interface Route{
   name: string,
}
interface TabIconProps{
    focused?: boolean;
    color?: string;
    size?: number;
    route?:Route
}

export type {TabIconProps}