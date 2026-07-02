import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["snapshot-comp"]: CustomElement<any>;
      "aui-table": {
        type?: string;
        loader?: boolean;
        loadertype?: string;
        children?: React.ReactNode;
        headerbackground?: boolean;
        className?: string;
      };
      "aui-icon": {
        className?: string;
        block?: boolean;
        icon?: string;
        svgclass?: string;
        svgwidth?: string | number;
        svgheight?: string | number;
        pathclass?: string;
        customcolor?: boolean;
        fillcolor?: string;
        hovercolor?: string;
      };
    }
  }

  namespace NodeJS {
    interface Module {
      hot?: {
        accept: (path?: string, callback?: () => void) => void;
      };
    }
  }
}
