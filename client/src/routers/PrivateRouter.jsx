import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthServices from "../services/useAuthServices";
const PrivateRouter = () => {
  const { token, checkLoopTime } = useSelector((state) => state.auth);
  const { currentApi } = useAuthServices(); 

  const now = new Date().getTime();
  const fifteenMinutesAgo = new Date(now - 10 * 60 * 1000).getTime();
  // console.log("now=", now);
  // console.log("now=", new Date(now));
  // console.log("fifteenMinutesAgo=", fifteenMinutesAgo);
  // console.log("fifteenMinutesAgo=", new Date(fifteenMinutesAgo));
  // console.log("checkLoopTime=", checkLoopTime);
  // console.log("checkLoopTime=", new Date(checkLoopTime));
  // console.log(
  //   "fifteenMinutesAgo >= checkLoopTime =>",
  //   fifteenMinutesAgo >= checkLoopTime
  // );

  useEffect(() => {
    if (fifteenMinutesAgo >= checkLoopTime) { 
      currentApi(now);
    }// eslint-disable-next-line
  }, [fifteenMinutesAgo >= checkLoopTime]);
  console.log("------------------------------------------------");
 
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
