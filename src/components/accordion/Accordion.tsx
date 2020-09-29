import React from "react";

import styles from "./Accordion.module.scss";

import { AccordionModel } from "./Accordion.model";
import AccordionItem from "./AccordionItem";

const Accordion = ({
  header,
  competitions,
  styleOptions,
}: AccordionModel): JSX.Element => {
  return (
    <div className={styles.Container} style={styleOptions}>
      <div className={styles.Title}>
        <div className={styles.TitleContent}>{header}</div>
      </div>
      {competitions.map((competition, index) => (
        <AccordionItem
          key={index}
          school={competition.school}
          years={competition.years}
        />
      ))}
    </div>
  );
};

export default Accordion;
