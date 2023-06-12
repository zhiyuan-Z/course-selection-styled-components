import { useCourse } from "@/contexts/CourseContext";
import { MouseEvent, useMemo } from "react";
import styled from "styled-components";

const StyledCourseSelectionFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SelectButton = styled.button`
  padding: 0.125rem 0.25rem;
  font-weight: 600;
`;

export default function CourseSelectionFooter({ totalCredit }: { totalCredit: number }) {
  const { courses, submitSelection } = useCourse();

  const clickHandler = (e: MouseEvent) => {
    if (confirm(`You have chosen ${totalCredit} credits for this semester. You cannot change once you submit. Do you want to confirm?`) === true) {
      submitSelection();
      (e.target as HTMLButtonElement).disabled = true;
    }
  };

  return (
    <StyledCourseSelectionFooter>
      <span>Total Credit: {totalCredit}</span>
      <SelectButton onClick={clickHandler}>Select</SelectButton>
    </StyledCourseSelectionFooter>
  );
}
