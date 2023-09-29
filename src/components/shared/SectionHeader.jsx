import React from "react";

export const SectionHeader = ({ heading, title, description }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-primary">{heading}</h1>
      <h3 className="py-2 text-4xl font-bold">{title}</h3>
      <p className="md:w-1/2 mx-auto">{description}</p>
    </div>
  );
};
