import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter, userRouter } from "next/router";

// initial state
const intialState = {
  user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);

  // router
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    function (error) {
      console.log(error);
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger

      dispatch({ type: "LOGOUT" });
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              window.localStorage.removeItem("token");
              router.push("/expire");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      // console.log("CSRF", data);
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };

// import { useReducer, createContext, useEffect } from "react";
// import axios from "axios";
// import { useRouter, userRouter } from "next/router";

// // initial state
// const intialState = {
//   user: null,
// };

// // create context
// const Context = createContext();

// // root reducer
// const rootReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { ...state, user: action.payload };
//     case "LOGOUT":
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// // context provider
// const Provider = ({ children }) => {
//   const [state, dispatch] = useReducer(rootReducer, intialState);

//   // router
//   const router = useRouter();

//   useEffect(() => {
//     dispatch({
//       type: "LOGIN",
//       payload: JSON.parse(window.localStorage.getItem("user")),
//     });
//   }, []);

//   axios.interceptors.response.use(
//     function (response) {
//       // any status code that lie within the range of 2XX cause this function
//       // to trigger
//       return response;
//     },
//     function (error) {
//       // any status codes that falls outside the range of 2xx cause this function
//       // to trigger
//       let res = error.response;
//       if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
//         return new Promise((resolve, reject) => {
//           axios
//             .get("/api/logout")
//             .then((data) => {
//               console.log("/401 error > logout");

//               window.localStorage.removeItem("user");

//               dispatch({ type: "LOGOUT" });
//               window.localStorage.removeItem("user");

//               router.push("/login");
//             })
//             .catch((err) => {
//               console.log("AXIOS INTERCEPTORS ERR", err);
//               reject(error);
//             });
//         });
//       }
//       return Promise.reject(error);
//     },
//   );

//   useEffect(() => {
//     const getCsrfToken = async () => {
//       const { data } = await axios.get("/api/csrf-token");
//       console.log("CSRF", data);
//       axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
//     };
//     getCsrfToken();
//   }, []);

//   return (
//     <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
//   );
// };

// export { Context, Provider };

// 	//user login state //LOGIN USER STATE save
// import { createContext, useReducer, useEffect } from "react";
// import { axios } from "axios";
// import { toast } from 'react-toastify';
// const LOGIN = "login";
// // const LOGOUT = "logout";
// //inital state
// const initialState = {
//   user: null,
// };
// //create context
// const Context = createContext();
// // reducer
// //state initial state
// const rootReducer = (state, action) => {
//   switch (action.type) {
//     //action type
//     case "LOGIN":
//       return { ...state, user: action.payload };
//     case "LOGOUT":
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };
// //context provider
// //children props to wrap app
// const Provider = ({ children }) => {
//   //
//   const [state, dispatch] = useReducer(rootReducer, initialState);
//   useEffect(() => {
//     //effect
//     dispatch({
//       type: "LOGIN",
//       //localstorage to js json to js onject
//       payload: JSON.parse(window.localStorage.getItem("user")),
//     });
//     // return () => {
//     //   //cleanup
//     // }
//   }, []); //input
//   // after token expire 401 unauthorize
//   //   axios.interceptors.response.use(
//   //     function(response){
//   //       //any status code that lie within the range of 200 cause this function
//   //       //to triger
//   //       return response;
//   //     },
//   //     funnction(error) {
//   //       //if any got error
//   //       //if any status codes that fallss outside the range of 200 cause this function
//   //       //to trigger
//   //       let res= error.response
//   //       if (res.status===401&& res.congif && !res.config.__isRetryRequest){
//   //         return new Promise((resolve, reject)=>{
//   //           axios.get('/api/logout')
//   //           .then((data)=>{
//   //           })
//   //           .catch((err)=>{
//   // console.log('Axios interceptors',err)
//   // reject
//   //           })
//   //         })
//   //       }
//   //     }
//   //   )
//   axios.interceptors.response.use(
//     function (response) {
//       // any status code that lie within the range of 2XX cause this function
//       // to trigger
//       return response;
//     },
//     function (error) {
//       // any status codes that falls outside the range of 2xx cause this function
//       // to trigger
//       let res = error.response;
//       if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
//         return new Promise((resolve, reject) => {
//           axios
//             .get("/api/logout")
//             .then((data) => {
//               console.log("/401 error > logout");
//               dispatch({ type: "LOGOUT" });
//               window.localStorage.removeItem("user");
//               router.push("/login");
//             })
//             .catch((err) => {
//               console.log("AXIOS INTERCEPTORS ERR", err);
//               reject(error);
//             });
//         });
//       }
//       return Promise.reject(error);
//     },
//   );
//   //csrf header to axios header actual request
//   useEffect(() => {
//     //effect
//     const getCsrfToken = async () => {
//       const { data } = await axios.get("/api/csrf-token");
//       //header
//       console.log("csrf", data);
//       axios.default.headers["X-CSRF-TOKEN"] = data.getCsrfToken;
//     };
//     getCsrfToken();
//   }, []);
//   return (
//     //entire app to access state and dispatch
//     <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
//   );
// };
// export { Context, Provider };
