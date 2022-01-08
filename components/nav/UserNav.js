import Link from "next/link";
import { useState, useEffect } from "react";
const UserNav = () => {
  const [active, setactive] = useState("");
  useEffect(() => {
    process.browser && setactive(window.location.pathname);
    // console.log(process.browser && window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div className='nav flex-column nav-pills '>
      <Link href='/user'>
        <a className={`nav-link ${active === "/user" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link href='/user/support'>
        <a className={`nav-link ${active === "/user/support" && "active"}`}>
          Help and support
        </a>
      </Link>
    </div>
  );
};

export default UserNav;
