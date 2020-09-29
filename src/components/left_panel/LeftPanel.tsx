import React from "react";

import styles from "./LeftPanel.module.scss";

import Accordion from "../accordion/Accordion";
import { AccordionModel } from "../accordion/Accordion.model";

type LeftPanelProps = {
  divRef: React.RefObject<HTMLDivElement>;
  styleOptions: React.CSSProperties;
  testInfo: AccordionModel;
};

const LeftPanel = ({ divRef, styleOptions, testInfo }: LeftPanelProps) => {
  return (
    <div ref={divRef} className={styles.Container} style={styleOptions}>
      <div className="App">
        <div>
          <Accordion
            header={testInfo.header}
            competitions={testInfo.competitions}
            // styleOptions={{ width: "200px" }}
            styleOptions={{}}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
