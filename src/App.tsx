import React, {
  useReducer,
  useEffect,
  useRef,
  useContext,
  useState,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styles from "./App.module.scss";

import * as appReducer from "./AppReducer";

import TestDataContext from "./TestDataContext";
import { ITest } from "./components/test_page/Test.model";

import Header from "./components/header/Header";
import LeftPanel from "./components/left_panel/LeftPanel";
import TestPage from "./components/test_page/TestPage";
import HomePage from "./components/home_page/HomePage";

import {
  AccordionItemModel,
  AccordionModel,
} from "./components/accordion/Accordion.model";

const WAIT_TIMEOUT: number = 1000;

const App = () => {
  const [state, dispatch] = useReducer(
    appReducer.appGridReducer,
    {
      isShown: true,
      headerPanelHeight: parseInt(styles.headerPanelHeight),
      defaultLeftPanelWidth: parseInt(styles.leftPanelWidth),
      leftPanelWidth: parseInt(styles.leftPanelWidht),
      grabWidth: parseInt(styles.grabWidth),
      pseudoWidth: parseInt(styles.pseudoWidth),
      arrowClass: styles.ArrowRotate,
      leftPanelWidthStyle: `${parseInt(styles.leftPanelWidth)}px`,
      columnStyle: appReducer.gridColumnStyle(
        parseInt(styles.leftPanelWidht),
        parseInt(styles.grabWidth),
        parseInt(styles.pseudoWidth)
      ),
      rowStyle: appReducer.gridRowStyle(
        parseInt(styles.headerPanelHeight),
        parseInt(styles.pseudoWidth)
      ),
    },
    appReducer.appGridInit
  );

  useEffect(() => {
    // Either getting panel with from _globas.scss export
    // dispatch({ type: INITIALIZER, value: parseInt(styles.leftPanelWidth) });

    // Or getting it from useRef linking to div in LeftPanel
    // to make sure it is the post mounted value
    dispatch({
      type: appReducer.INITIALIZER,
      value: leftPanelRef.current ? leftPanelRef.current.offsetWidth : 0,
    });
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resizeListener = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(
        () => dispatch({ type: appReducer.RESIZE }),
        WAIT_TIMEOUT
      );
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  });

  let leftPanelRef = useRef<HTMLDivElement>(null);

  const testData: ITest[] = useContext(TestDataContext);
  let schoolSet: Set<string> = new Set();
  testData.forEach((test) => {
    schoolSet.add(test.school);
  });
  let testMap: Map<string, string[]> = new Map<string, string[]>();
  schoolSet.forEach((school) => {
    testMap.set(school, []);
    testData.forEach((test) => {
      if (test.school === school) {
        testMap.get(school)?.push(test.year);
      }
    });
  });

  let testInfo: AccordionModel = {
    header: "Competitions",
    competitions: [],
  };

  testMap.forEach((years: string[], school: string) => {
    if (school.length > 0) {
      let item: AccordionItemModel = {
        school: school,
        years: [],
      };
      years.forEach((year) => {
        item.years.push(year.toString());
      });
      testInfo.competitions.push(item);
    }
  });

  console.log("PUBLIC_ENV", process.env.PUBLIC_ENV);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div
        className={styles.AppContainer}
        style={
          state.columnStyle ? { gridTemplateColumns: state.columnStyle } : {}
        }
      >
        <Header styleOptions={{ gridRow: 1, gridColumn: "1 /span 4" }} />
        <LeftPanel
          divRef={leftPanelRef}
          styleOptions={{
            gridRow: 2,
            gridColumn: 1,
            width: `${state.leftPanelWidthStyle}`,
          }}
          testInfo={testInfo}
        />
        <div
          className={styles.LeftGrabContainer}
          onClick={() => {
            dispatch({ type: appReducer.TOGGLE });
          }}
        >
          <div className={`${state.arrowClass}`}>
            <svg
              viewBox="0 0 8 20"
              width="8px"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M 0,0 V 20 L 8,10 Z"></path>
            </svg>
          </div>
        </div>
        <Switch>
          <Route path="/TestPage/:school/:yearAsString" exact>
            <TestPage styleOptions={{ gridRow: 2, gridColumn: 3 }} />
          </Route>
          <Route path="/" exact>
            <HomePage styleOptions={{ gridRow: 2, gridColumn: 3 }} />
          </Route>
        </Switch>
        <div className={styles.BottomPanel}>
          <div>Bottom</div>
        </div>
        <div className={styles.RightMostPanel}></div>
      </div>
    </Router>
  );
};

export default App;
