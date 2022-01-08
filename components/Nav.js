// importing menu from antd
import { Menu, Row, Col, Drawer } from "antd";
//importing link from next js
import styles from "../public/styles/Home.module.css";
import { useWindowWidth } from "@react-hook/window-size";
import Link from "next/Link";
import { toast } from "react-toastify";
//importing icon
import {
  HomeTwoTone,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Select, Button, Avatar, Badge } from "antd";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const onlyWidth = useWindowWidth();
  const [size, setSize] = useState(1);
  useEffect(() => {
    if (onlyWidth < 665) {
      setSize(0);
    } else if (onlyWidth > 665) {
      setSize(1);
    }
  }, [onlyWidth]);
  console.log(size);
  //for active after refresh
  const [active, setactive] = useState("");
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    process.browser && setactive(window.location.pathname);
    // console.log(process.browser && window.location.pathname);
  }, [process.browser && window.location.pathname]);

  //destructing //import context to remove user
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  //router to redirect
  console.log(user);
  const routerRedirect = useRouter();
  const logout = async () => {
    //remove freom state
    dispatch({
      type: "LOGOUT",
    });
    //remove from local storage
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    routerRedirect.push("/login");
  };

  // destructuring the Menu.Item to Item
  const { Item, SubMenu, ItemGroup } = Menu;
  return (
    // <div className='navWrapperr'>
    //   <div className='maxWidthHold navBar'>
    //     <div className='logo'>
    //       <h1>Vidhalaya</h1>
    //       <span></span>
    //     </div>
    //     <div className='navContent'>
    //       <p>About Us</p>
    //       <p>Programs</p>
    //       <p>Pricing</p>
    //       <p>Instructor</p>
    //       <p>Blogs</p>
    //     </div>
    //     <div className='navWatch'>
    //       <span>Youtube</span>
    //       <div className='watchIcon'>
    //         <svg
    //           width='18'
    //           height='18'
    //           viewBox='0 0 18 18'
    //           fill='none'
    //           xmlns='http://www.w3.org/2000/svg'>
    //           <path
    //             d='M13.0455 9.78403L5.88712 13.9375C5.27962 14.2897 4.5 13.8633 4.5 13.1534V4.8464C4.5 4.13765 5.2785 3.71015 5.88712 4.0634L13.0455 8.2169C13.1837 8.29579 13.2986 8.40983 13.3785 8.54744C13.4584 8.68505 13.5004 8.84134 13.5004 9.00047C13.5004 9.15959 13.4584 9.31588 13.3785 9.45349C13.2986 9.59111 13.1837 9.70514 13.0455 9.78403V9.78403Z'
    //             fill='#FF0000'
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className='navWrapperr'>
        {size === 1 ? (
          <Menu
            mode='horizontal'
            selectedKeys={active}
            className='mb-2'
            className='navBar maxWidthHold'>
            <Item key='home' className='mr-5 pr-5'>
              <div className='logo'>
                <h1>Vidhalaya</h1>
                <span></span>
              </div>
            </Item>
            {/* <div className='navContent'> */}
            <Item
              key='/'
              className={`${active == "/" ? "active" : ""}`}
              onClick={(e) => setactive(e.key)}
              icon={<HomeTwoTone />}>
              <Link href='/'>
                <a className='navContenta'> APP</a>
              </Link>
            </Item>
            <Item
              className={`${active == "/Post" ? "active" : ""}`}
              key='/Post'
              onClick={(e) => setactive(e.key)}>
              <Link href='/Post'>
                <a className='navContenta'> Blog</a>
              </Link>
            </Item>

            {user ? (
              <>
                {user && user.role && user.role.includes("Admin") && (
                  <Item
                    className={`${active == "/admin" ? "active" : ""}`}
                    key='/instructor/course/create'
                    onClick={(e) => setactive(e.key)}
                    icon={<BookOutlined />}>
                    <Link href='/admin'>
                      <a className='navContenta'> ADmin</a>
                    </Link>
                  </Item>
                )}
                {/* arraycheck by inclued  */}
                {user && user.role && user.role.includes("Instructor") ? (
                  <Item
                    className={`${
                      active == "/instructor/course/create" ? "active" : ""
                    }`}
                    key='/instructor/course/create'
                    onClick={(e) => setactive(e.key)}
                    icon={<BookOutlined />}>
                    <Link href='/instructor/course/create'>
                      <a className='navContenta'> Create Course</a>
                    </Link>
                  </Item>
                ) : (
                  <Item
                    className={`${
                      active == "/user/create-instructor" ? "active" : ""
                    }`}
                    key='/user/create-instructor'
                    onClick={(e) => setactive(e.key)}
                    icon={<TeamOutlined />}>
                    <Link href='/user/create-instructor'>
                      <a className='navContenta'>Become Instructor </a>
                    </Link>
                  </Item>
                )}

                <SubMenu
                  align='end'
                  key='/sub'
                  className='  navContenta'
                  icon={<UserOutlined />}
                  title={user && user.name}>
                  <ItemGroup>
                    {user && user.role && user.role.includes("Instructor") && (
                      <Item
                        key='/instructor'
                        onClick={(e) => setactive(e.key)}
                        icon={<TeamOutlined />}>
                        <Link href='/instructor'>
                          <a className='navContenta'> Instructor </a>
                        </Link>
                      </Item>
                    )}
                    <Item key='/user'>
                      <Link href='/user'>
                        <a className='navContenta'>Dashboard</a>
                      </Link>
                    </Item>
                    <Item key='/profile'>
                      <Link href={`/profile/${user._id}`}>
                        <a className='navContenta'>Profile</a>
                      </Link>
                    </Item>

                    <Item key='/changePassword'>
                      <Link href='/changePassword'>
                        <a className='navContenta'>Change Password</a>
                      </Link>
                    </Item>
                    <Item
                      className='navContenta'
                      key='/logout'
                      onClick={logout}
                      icon={<LogoutOutlined />}>
                      Logout
                    </Item>
                  </ItemGroup>
                </SubMenu>
              </>
            ) : (
              <>
                <Item
                  key='/login'
                  className={`${active == "/login" ? "active" : ""}`}
                  onClick={(e) => setactive(e.key)}
                  icon={<LoginOutlined />}>
                  <Link href='/login'>
                    <a className='navContenta'> Login</a>
                  </Link>
                </Item>
                <Item
                  key='/register'
                  className={`${active == "/register" ? "active" : ""}`}
                  onClick={(e) => setactive(e.key)}
                  icon={<UserAddOutlined />}>
                  <Link href='/register'>
                    <a className='navContenta'> Register</a>
                  </Link>
                </Item>
                <Item key='yututbe'>
                  <div className='navWatch'>
                    <span>Youtube</span>
                    <div className='watchIcon'>
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M13.0455 9.78403L5.88712 13.9375C5.27962 14.2897 4.5 13.8633 4.5 13.1534V4.8464C4.5 4.13765 5.2785 3.71015 5.88712 4.0634L13.0455 8.2169C13.1837 8.29579 13.2986 8.40983 13.3785 8.54744C13.4584 8.68505 13.5004 8.84134 13.5004 9.00047C13.5004 9.15959 13.4584 9.31588 13.3785 9.45349C13.2986 9.59111 13.1837 9.70514 13.0455 9.78403V9.78403Z'
                          fill='#FF0000'
                        />
                      </svg>
                    </div>
                  </div>
                </Item>
              </>
            )}
            {/* </div> */}
          </Menu>
        ) : (
          <div>
            <div
              style={{
                float: "left",
                width: "220px",
                height: "31px",
                margin: "16px 24px 16px 0",
                background: "rgba(255, 255, 255, 0.3)",
              }}>
              <div className='logo'>
                <h1>Vidhalaya</h1>
                <span></span>
              </div>
            </div>
            <>
              <Button
                onClick={showDrawer}
                className={styles.menubtn}
                type='primary'
                shape='circle'
                icon={<MenuOutlined />}></Button>
              <Drawer
                title='Menu'
                onClose={onClose}
                visible={visible}
                placement='right'>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Menu selectedKeys={active} className='mb-2'>
                    {/* <div className='navContent'> */}
                    <Item
                      key='/'
                      className={`${active == "/" ? "active" : ""}`}
                      onClick={(e) => setactive(e.key)}
                      icon={<HomeTwoTone />}>
                      <Link href='/'>
                        <a className='navContenta'> APP</a>
                      </Link>
                    </Item>
                    <Item
                      className={`${active == "/Post" ? "active" : ""}`}
                      key='/Post'
                      onClick={(e) => setactive(e.key)}>
                      <Link href='/Post'>
                        <a className='navContenta'> Blog</a>
                      </Link>
                    </Item>

                    {user ? (
                      <>
                        {user && user.role && user.role.includes("Admin") && (
                          <Item
                            className={`${active == "/admin" ? "active" : ""}`}
                            key='/instructor/course/create'
                            onClick={(e) => setactive(e.key)}
                            icon={<BookOutlined />}>
                            <Link href='/admin'>
                              <a className='navContenta'> ADmin</a>
                            </Link>
                          </Item>
                        )}
                        {/* arraycheck by inclued  */}
                        {user &&
                        user.role &&
                        user.role.includes("Instructor") ? (
                          <Item
                            className={`${
                              active == "/instructor/course/create"
                                ? "active"
                                : ""
                            }`}
                            key='/instructor/course/create'
                            onClick={(e) => setactive(e.key)}
                            icon={<BookOutlined />}>
                            <Link href='/instructor/course/create'>
                              <a className='navContenta'> Create Course</a>
                            </Link>
                          </Item>
                        ) : (
                          <Item
                            className={`${
                              active == "/user/create-instructor"
                                ? "active"
                                : ""
                            }`}
                            key='/user/create-instructor'
                            onClick={(e) => setactive(e.key)}
                            icon={<TeamOutlined />}>
                            <Link href='/user/create-instructor'>
                              <a className='navContenta'>Become Instructor </a>
                            </Link>
                          </Item>
                        )}

                        {user && user.role && user.role.includes("Instructor") && (
                          <Item
                            key='/instructor'
                            onClick={(e) => setactive(e.key)}
                            icon={<TeamOutlined />}>
                            <Link href='/instructor'>
                              <a className='navContenta'> Instructor </a>
                            </Link>
                          </Item>
                        )}
                        <Item key='/user'>
                          <Link href='/user'>
                            <a className='navContenta'>Dashboard</a>
                          </Link>
                        </Item>
                        <Item key='/profile'>
                          <Link href={`/profile/${user._id}`}>
                            <a className='navContenta'>Profile</a>
                          </Link>
                        </Item>

                        <Item key='/changePassword'>
                          <Link href='/changePassword'>
                            <a className='navContenta'>Change Password</a>
                          </Link>
                        </Item>
                        <Item
                          className='navContenta'
                          key='/logout'
                          onClick={logout}
                          icon={<LogoutOutlined />}>
                          Logout
                        </Item>
                      </>
                    ) : (
                      <>
                        <Item
                          key='/login'
                          className={`${active == "/login" ? "active" : ""}`}
                          onClick={(e) => setactive(e.key)}
                          icon={<LoginOutlined />}>
                          <Link href='/login'>
                            <a className='navContenta'> Login</a>
                          </Link>
                        </Item>

                        <Item
                          key='/register'
                          className={`${active == "/register" ? "active" : ""}`}
                          onClick={(e) => setactive(e.key)}
                          icon={<UserAddOutlined />}>
                          <Link href='/register'>
                            <a className='navContenta'> Register</a>
                          </Link>
                        </Item>

                        <Item>
                          <div className='navWatch'>
                            <span>Youtube</span>
                            <div className='watchIcon'>
                              <svg
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  d='M13.0455 9.78403L5.88712 13.9375C5.27962 14.2897 4.5 13.8633 4.5 13.1534V4.8464C4.5 4.13765 5.2785 3.71015 5.88712 4.0634L13.0455 8.2169C13.1837 8.29579 13.2986 8.40983 13.3785 8.54744C13.4584 8.68505 13.5004 8.84134 13.5004 9.00047C13.5004 9.15959 13.4584 9.31588 13.3785 9.45349C13.2986 9.59111 13.1837 9.70514 13.0455 9.78403V9.78403Z'
                                  fill='#FF0000'
                                />
                              </svg>
                            </div>
                          </div>
                        </Item>
                      </>
                    )}
                    {/* </div> */}
                  </Menu>
                </div>
              </Drawer>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
