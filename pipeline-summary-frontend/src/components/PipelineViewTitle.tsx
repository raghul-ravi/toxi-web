import '../styles/components/PipelineViewTitle.css';

interface PipelineViewTitleProps {
  title: string;
}

export const PipelineViewTitle = ({ title }: PipelineViewTitleProps) => {
  return (
    <h1 className="pipeline-view-title">
      {title}
    </h1>
  );
};