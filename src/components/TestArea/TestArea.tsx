import "./TestArea.css";

interface TestAreaProps {
  children?: React.ReactNode;
}
export default function TestArea({ children }: TestAreaProps) {
  return (
    <div className="testArea">
      <h2>Test Area</h2>
      <p>This is a test area for all moles.</p>
      <p>Here you can test various components and functionalities.</p>
      <div>{children || "Test components here"}</div>
    </div>
  );
}
