import React from "react";
// import * as Latex from "react-latex";

type Attributes = {
  displayMode?: boolean;
  fleqn?: boolean;
};

export const LatexParserOptions = {
  // replace: (domNode: any) => {
  //   // console.log(domNode);
  //   if (domNode.name === "latex") {
  //     // console.log("attib", domNode.attribs, domNode.attribs?.displaymode);
  //     let attribs: Attributes = {};
  //     if (domNode.attribs?.displaymode) {
  //       attribs.displayMode = true;
  //     }
  //     if (domNode.attribs?.fleqn) {
  //       attribs.fleqn = true;
  //     }
  //     return React.createElement(Latex, attribs, domNode.children[0].data);
  //   }
  // },
};
