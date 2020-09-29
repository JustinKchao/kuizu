import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// import "katex/dist/katex.min.css";
import parse from "html-react-parser";
import { LatexParserOptions } from "../../utilities/LatexParser";

import styles from "./TestPage.module.scss";

import TestDataContext from "../..//TestDataContext";
import { IQuestion, ITest } from "./Test.model";

const getMathJax = () => (window as any).MathJax;

type TestPageProps = {
  styleOptions: React.CSSProperties;
};

const TestPage = ({ styleOptions }: TestPageProps) => {
  let { school, yearAsString } = useParams<TestPageParams>();
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    typeset(() => divRef.current!);
  }, [school, yearAsString]);

  const testData: ITest[] = useContext(TestDataContext);
  const foundTest = testData.find((test) => {
    return test.school === school && test.year === yearAsString;
  });

  const typeset = (selector: () => HTMLElement) => {
    const mathJax = getMathJax();
    // If MathJax script hasn't been loaded yet, then do nothing.
    console.log("selector", selector());
    if (!mathJax) {
      return null;
    }
    if (!mathJax.startup.promise) {
      return null;
    }
    mathJax.startup.promise = mathJax.startup?.promise
      .then(() => {
        selector();
        return mathJax.typesetPromise();
      })
      .catch((err: any) => console.error(`Typeset failed: ${err.message}`));
    return mathJax.startup.promise;
  };

  type TestPageParams = {
    school?: string | undefined;
    yearAsString?: string;
  };

  return (
    <div className={styles.Container} style={styleOptions}>
      {foundTest ? (
        <div className={styles.MainHeader}>{foundTest?.mainTitle}</div>
      ) : null}
      {foundTest ? (
        <div className={styles.Direction}>
          {parse(foundTest.direction, LatexParserOptions)}
        </div>
      ) : null}
      {foundTest?.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.title === "Tie-Breakers" ? (
            <div>
              <div className={styles.SectionHeader}>{section.title} </div>
              <ol style={{ listStyleType: "upper-alpha" }}>
                {section.questions?.map(
                  (questionItem: IQuestion, index: number) => (
                    <li key={index}>
                      {parse(questionItem.question, LatexParserOptions)}
                    </li>
                  )
                )}
              </ol>
            </div>
          ) : (
            <ol>
              {section.questions?.map(
                (questionItem: IQuestion, index: number) => (
                  <li key={index}>
                    {parse(questionItem.question, LatexParserOptions)}
                  </li>
                )
              )}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
};

export default TestPage;
