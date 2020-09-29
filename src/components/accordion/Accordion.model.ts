import React from "react";

export interface AccordionItemModel {
  school: string;
  years: string[];
}

export interface AccordionModel {
  header: string;
  competitions: AccordionItemModel[];
  styleOptions?: React.CSSProperties;
}
