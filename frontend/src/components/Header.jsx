import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="header">
        <span></span>
        <span className="profile" onClick={() => setOpen(true)}>
          👤
        </span>
      </div>

      {open && <LogoutModal close={() => setOpen(false)} />}
    </>
  );
}
