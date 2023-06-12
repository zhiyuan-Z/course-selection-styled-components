import { CourseProvider } from "@/contexts/CourseContext";
import "@/styles/globals.css";
import Theme from "@/styles/theme";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Course Selection",
  description: "Course selection app using Next 13 and Styled Components",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Theme>
          <CourseProvider>{children}</CourseProvider>
        </Theme>
      </body>
    </html>
  );
}
