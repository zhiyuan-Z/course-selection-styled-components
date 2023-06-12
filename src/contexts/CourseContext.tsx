"use client";

import { courseData } from "@/components/CourseLists";
import { createContext, useReducer, useCallback, useContext } from "react";

const actionTypes = {
  LOAD_COURSES: "LOAD_COURSES",
  SELECT_COURSE: "SELECT_COURSE",
  SUBMIT_SELECTION: "SUBMIT_SELECTION",
};

type CourseState = {
  courses: courseData[];
};

type CourseAction = {
  type: string;
  payload?: courseData[] | number;
};

type initialStateType = {
  courses: courseData[];
};

const initialState = { courses: [] };

function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case actionTypes.LOAD_COURSES:
      const courses = action.payload;
      return {
        ...state,
        courses: courses as courseData[],
      };
    case actionTypes.SELECT_COURSE:
      const id = action.payload;
      return {
        ...state,
        courses: state.courses.map(course => (course.courseId === id ? { ...course, selected: !!!course.selected } : course)),
      };
    case actionTypes.SUBMIT_SELECTION:
      const ids = action.payload;
      return {
        ...state,
        courses: state.courses.map(course => (!!course.selected ? { ...course, selected: false, enrolled: true } : course)),
      };
    default:
      return state;
  }
}

const useCourseContext = (initialState: initialStateType) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const loadCourses = useCallback((courses: courseData[]) => {
    console.log(courses);
    dispatch({ type: actionTypes.LOAD_COURSES, payload: courses });
  }, []);

  const selectCourse = useCallback((id: number) => {
    console.log(state.courses);
    dispatch({ type: actionTypes.SELECT_COURSE, payload: id });
  }, []);

  const submitSelection = useCallback(() => {
    dispatch({ type: actionTypes.SUBMIT_SELECTION });
  }, []);

  return { state, loadCourses, selectCourse, submitSelection };
};

type UseCourseContextType = ReturnType<typeof useCourseContext>;

const initContextState: UseCourseContextType = {
  state: initialState,
  loadCourses: () => {},
  selectCourse: () => {},
  submitSelection: () => {},
};

const CourseContext = createContext<UseCourseContextType>(initContextState);

const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  return <CourseContext.Provider value={useCourseContext(initialState)}>{children}</CourseContext.Provider>;
};

type UseCourseHookType = {
  courses: courseData[];
  loadCourses: (courses: courseData[]) => void;
  selectCourse: (id: number) => void;
  submitSelection: () => void;
};

const useCourse = (): UseCourseHookType => {
  const {
    state: { courses },
    loadCourses,
    selectCourse,
    submitSelection,
  } = useContext(CourseContext);
  return { courses, loadCourses, selectCourse, submitSelection };
};

export { actionTypes, CourseContext, CourseProvider, useCourse };
