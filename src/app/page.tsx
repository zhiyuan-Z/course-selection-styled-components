"use client";

import Image from "next/image";
import CourseLists from "@/components/CourseLists";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`

export default function Home() {
  return (
    <Main>
      <Title>Class Selection Page</Title>
      <CourseLists />
    </Main>
  );
}
