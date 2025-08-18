import React from 'react';

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
      {title}
    </h1>
  );
};