"use client";

import styled from "styled-components";
import { courseData } from "./CourseLists";
import { useCourse } from "@/contexts/CourseContext";

type courseItemProps = {
  courseData: courseData;
  totalCredit?: number;
};

const StyledCourseItem = styled.div`
  border: solid 1px black;
  display: flex;
  flex-direction: column;
  text-align: center;

  &:nth-child(even) {
    background: ${props => props.theme.colors.courseItem.backgroundEvenChild};
  }

  &.courseItem-selected {
    background-color: ${props => props.theme.colors.courseItem.backgroundSelected};
  }
`;

export default function CourseItem(props: courseItemProps) {
  const { courseData, totalCredit } = props;
  const { selectCourse } = useCourse();

  const clickHandler = () => {
    console.log("clicked!");
    if (!!!courseData.enrolled) {
      if ((totalCredit !== undefined && !!!courseData.selected) && totalCredit + courseData.credit > 18) {
        alert("You can only choose up to 18 credits in one semester");
        return;
      }
      selectCourse(courseData.courseId);
    }
  };

  return (
    <StyledCourseItem onClick={clickHandler} className={!!courseData.selected ? "courseItem-selected" : ""}>
      <p>{courseData.courseName}</p>
      <p>Course Type : {courseData.required ? "Compulsory" : "Elective"}</p>
      <p>Course Credit : {courseData.credit}</p>
    </StyledCourseItem>
  );
}
