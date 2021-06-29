/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import PredictPhoto from "views/PredictPhoto.js";
import ComingSoon from "views/ComingSoon";
import Register from "views/Register";
import Login from "views/Login";
import NewCamera from "views/cameras/NewCamera";
import ManageCameras from "views/cameras/ManageCameras";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ComingSoon,
    layout: "/admin",
  },
  {
    path: "/detect/mask",
    name: "Detect Mask",
    rtlName: "خرائط",
    icon: "tim-icons icon-atom",
    component: PredictPhoto,
    layout: "/admin",
  },
  {
    path: "/detect/traffic",
    name: "Detect Traffic",
    rtlName: "خرائط",
    icon: "tim-icons icon-atom",
    component: ComingSoon,
    layout: "/admin",
  },
  {
    path: "/detect/visitor",
    name: "Detect Visitor",
    rtlName: "خرائط",
    icon: "tim-icons icon-atom",
    component: ComingSoon,
    layout: "/admin",
  },
  {
    path: "/manage/cameras/new",
    name: "New Camera",
    hide: true,
    component: NewCamera,
    layout: "/admin",
  },
  {
    path: "/manage/cameras",
    name: "Manage Cameras",
    rtlName: "خرائط",
    icon: "tim-icons icon-notes",
    component: ManageCameras,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "tim-icons icon-notes",
    component: Login,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "خرائط",
    icon: "tim-icons icon-notes",
    component: Register,
    layout: "/admin",
    hide: true,
  },
];
export default routes;
