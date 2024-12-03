declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >;
    const value: string;
    export default value;
    export { ReactComponent };
}

declare module '*.jpg' {
    const value: number;
    export default value;
  }
  
  declare module '*.png' {
    const value: number;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: number;
    export default value;
  }
  
  declare module '*.gif' {
    const value: number;
    export default value;
  }
  