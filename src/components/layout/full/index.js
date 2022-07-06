import './index.scss';

export default function FullLayout({ children }) {
  return (
    <div className={"full_layout"}>
      <div className="container">
        <div className={"content"}>{children}</div>
      </div>
    </div>
  );
}
