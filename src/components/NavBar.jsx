import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import { UserContext } from "../contexts/UserContext";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";
import {} from "../css/custom.scss"; //important!


const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);

  const history = useHistory();
  const handleOnClickCategory = (categoryId) => {
    history.push(`/programs/categories/${categoryId}`);
  };


  const handleOnclickLogout = async () => {
    await logout();
  };
  
  const renderNavDropDownItem = () => {
    return categories.map((category) => (
      <NavDropdown.Item
        className={styles.Dropcolor}
        key={category.id}
        onClick={() => {
          handleOnClickCategory(category.id);
        }}
      >
        {category.name}
      </NavDropdown.Item>
    ));
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.dark} variant="dark">
      <Navbar.Brand>
        <NavLink className={styles.logo} to="/">
           
          <img
           
            src="../assets/icon.png"
            width="180"
          height="30"
            alt="logo"
          />
 
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" >  
        <Nav className="ml-auto pr-md-5">
          <NavLink className={styles.link} to="/">
            Channels
          </NavLink>
          <NavDropdown 
            className={styles.Dropcolor}
            className="pr-md-5"
            title="Categories"
            id="dropdown-item-button" //id="collapsible-nav-dropdown"
          >
            {categories && renderNavDropDownItem()}
          </NavDropdown>
          {user ? (
            <NavLink className={styles.link} to="/favorite">
              My favourites
            </NavLink>
          ) : (
            ""
          )}
          {user ? (
            <NavLink
              to="/"
              onClick={() => {
                handleOnclickLogout();
              }}
              className={styles.link}
            >
              Logout / {user.userName}
            </NavLink>
          ) : (
            <NavLink className={styles.link} to="/users/login">
              Login
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
