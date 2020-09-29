export interface IQuestion {
  question: string;
  answer: string;
}

export interface ITestSection {
  title: string;
  questions: IQuestion[];
}

export interface ITest {
  id: string;
  school: string;
  year: string;
  mainTitle: string;
  direction: string;
  sections: ITestSection[];
}
