import React, { useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Accordion.module.scss";

import { AccordionItemModel } from "./Accordion.model";

type AccordionItemState = {
  active: boolean;
  chevronClass: string;
};

const TOGGLE = "TOGGLE";
type Toggle = {
  readonly type: typeof TOGGLE;
};

const FUTURE = "FUTURE";
type Future = {
  readonly type: typeof FUTURE;
};

type AccordionItemActions = Toggle | Future;

// function reducer (state:State, action:Actions): State{
const reducer = (
  state: AccordionItemState,
  action: AccordionItemActions
): AccordionItemState => {
  // console.log(action.type);
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        active: !state.active,
        chevronClass: !state.active
          ? styles.ItemTriggerArrowRotate
          : styles.ItemTriggerArrowNormal,
      };
    case FUTURE:
      return {
        ...state,
        active: state.active,
      };
    default:
      return state;
  }
};

const AccordionItem = ({ school, years }: AccordionItemModel): JSX.Element => {
  const [state, dispatch] = useReducer<
    React.Reducer<AccordionItemState, AccordionItemActions>
  >(reducer, {
    active: false,
    chevronClass: styles.ItemTriggerArrowNormal,
  });
  const accordionBody = useRef<HTMLDivElement>(null);
  // const triggerArrow = useRef<HTMLDivElement>(null);

  const getWrapperStyle = (): React.CSSProperties => {
    if (accordionBody.current !== null) {
      return state.active && accordionBody
        ? { height: accordionBody.current?.scrollHeight + 10 }
        : { height: 0 };
    } else {
      return { height: 0 };
    }
  };

  return (
    <div className={styles.Item}>
      <div
        className={styles.ItemTrigger}
        onClick={() => dispatch({ type: TOGGLE })}
      >
        <div className={styles.ItemTriggerName}>{school}</div>
        <div className={`${state.chevronClass}`}>
          <svg
            viewBox="0 0 10 10"
            width="14px"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M 0,0 H 10 L 5, 10 Z"></path>
          </svg>
        </div>
      </div>
      <div
        ref={accordionBody}
        className={styles.ItemBody}
        style={getWrapperStyle()}
      >
        {years.map((year, index) => (
          <NavLink
            key={index}
            to={`/TestPage/${school}/${year}`}
            className={styles.ItemBodyRow}
          >
            {"Year " + year}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AccordionItem;
