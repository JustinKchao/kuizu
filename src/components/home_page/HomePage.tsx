import React from "react";

import styles from "./HomePage.module.scss";

type HomePageProps = {
  styleOptions: React.CSSProperties;
};

const HomePage = ({ styleOptions }: HomePageProps) => {
  return (
    <div className={styles.Container} style={styleOptions}>
      <div className={styles.Message}>
        Here, there are collections of previous Math Field Day tests given at
        the Palos Verdes Peninsula School District. Mrs. Mairs and Mrs. Thom
        have hosted this competition since
        <span style={{ fontWeight: "bold" }}> forever!</span>
      </div>

      <div className={styles.Disclaimer}>
        The content of the test was generated from an Adobe-scanned of the paper
        versions. As a result, there may be some errors. We hoped that those
        errors would get corrected over time.
      </div>
      <div className={styles.Disclaimer} style={{ fontWeight: "bold" }}>
        To the best of our understanding, the test content belongs to Mrs. Mairs
        and Mrs. Thom.
      </div>
    </div>
  );
};

export default HomePage;
