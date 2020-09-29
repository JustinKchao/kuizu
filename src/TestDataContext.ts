import React from "react";
import { cloneDeep } from "lodash";

import testJson from "./data/test_db.json";

import { ITest } from "./components/test_page/Test.model";

const testData: ITest[] = cloneDeep(testJson as ITest[]);

const TestDataContext = React.createContext(testData);

export default TestDataContext;
