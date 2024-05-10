import { Children } from "react";
import { Link, resolvePath } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        COGNIVITTA
      </Link>
      <ul>
        <CustomLink to="/holdings" className="Component">
          Holdings
        </CustomLink>
        <CustomLink to="/positions" className="Component">
          Positions
        </CustomLink>
        <CustomLink to="/orders" className="Component">
          Orders
        </CustomLink>
        <CustomLink to="/funds" className="Component">
          Funds
        </CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
