import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />

        <div className="content">
          <h2 className="logo">digitalflake</h2>
          <p>Welcome to Digitalflake admin</p>
        </div>
      </div>
    </div>
  );
}
