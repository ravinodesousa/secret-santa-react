import React from "react";
import NavigationBar from "../components/NavigationBar";

export default function CommonLayout({ children }) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
