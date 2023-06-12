"use client";

import useSWR from "swr";
import { useMemo } from "react";
import CourseItem from "./CourseItem";
import { useCourse } from "@/contexts/CourseContext";
import styled from "styled-components";
import CourseSelectionFooter from "./CourseSelectionFooter";

export type courseData = {
  courseName: string;
  courseId: number;
  required: boolean;
  credit: number;
  selected?: boolean;
  enrolled?: boolean;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BucketHeader = styled.div`
  text-align: center;
  font-weight: 600;
  border: solid 1px black;
  padding: 0.5rem 0;
`;

const BucketContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2rem;
`;

const CourseBucket = styled.div`
  width: ${props => props.theme.sizes.courseBucket.width};
  height: ${props => props.theme.sizes.courseBucket.height};
  font-size: ${props => props.theme.sizes.courseBucket.fontSize};
  overflow-y: scroll;
  border: solid 1px black;
`;

export default function CourseLists() {
  const { courses, loadCourses } = useCourse();
  const CoursesURL = "http://localhost:3000/courses";
  const { data, error, isLoading } = useSWR(CoursesURL, fetcher);
  console.log(loadCourses);
  useMemo(() => loadCourses(data), data);
  const totalCredit = useMemo(
    () =>
      courses?.reduce((acc, cur) => {
        if (cur.enrolled || cur.selected) {
          return acc + cur.credit;
        } else {
          return acc;
        }
      }, 0),
    courses
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <div>
      <BucketContainer>
        <CourseBucket>
          <BucketHeader>Available Courses</BucketHeader>
          {courses
            ?.filter(course => !!!course.enrolled)
            .map((course: courseData, index: number) => (
              <CourseItem key={index} courseData={course} totalCredit={totalCredit} />
            ))}
        </CourseBucket>
        <CourseBucket>
          <BucketHeader>Selected Courses</BucketHeader>
          {courses
            ?.filter(course => !!course.enrolled)
            .map((course: courseData, index: number) => (
              <CourseItem key={index} courseData={course} />
            ))}
        </CourseBucket>
      </BucketContainer>
      <CourseSelectionFooter totalCredit={totalCredit} />
    </div>
  );
}
