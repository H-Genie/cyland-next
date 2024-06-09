import Link from "next/link";
import styled from "@emotion/styled";
import { menuLists } from "constants/menuLists";
import { getPathname, setColor } from "utils";

export default function Navigator() {
  getPathname();

  return (
    <Nav>
      <ul>
        {menuLists.map((list, index) => (
          <NavList
            id={`ribbon${index}`}
            key={list.name}
            onClick={() => setColor(index)}
          >
            <Link href={list.link}>{list.name}</Link>
          </NavList>
        ))}
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  position: absolute;
  right: -68px;
  top: 102.406px;
`;
const NavList = styled.li`
  width: 100px;
  height: 50px;
  background-color: #7d88f9;
  color: white;
  font-family: "S-CoreDream-4Regular";

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid rgb(125, 102, 227);
  border-left-color: #85c8f2;
  border-left-width: 2px;

  margin-bottom: 10px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:nth-last-of-type(1) & {
    margin-bottom: 0;
  }

  &.selected {
    background-color: white;
    color: #7d88f9;
  }
`;
