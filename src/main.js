import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Button,
  Select,
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Message,
  MessageBox,
  Notification,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Tree,
  Card,
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Tabs,
  TabPane,
  Loading,
  Tooltip,
  Popover,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Badge,
  Avatar,
  Divider,
  Alert,
  Icon,
  Steps,
  Step,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Slider,
  Rate,
  Carousel,
  CarouselItem,
  Image,
  Backtop,
  InfiniteScroll,
  Drawer,
  Skeleton,
  SkeletonItem,
  Empty,
  Descriptions,
  DescriptionsItem,
  Result,
  Timeline,
  TimelineItem,
  Link,
  Scrollbar,
} from "element-ui";

const components = [
  Button,
  Select,
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Tree,
  Card,
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Tabs,
  TabPane,
  Tooltip,
  Popover,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Badge,
  Avatar,
  Divider,
  Alert,
  Icon,
  Steps,
  Step,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Slider,
  Rate,
  Carousel,
  CarouselItem,
  Image,
  Backtop,
  Drawer,
  Skeleton,
  SkeletonItem,
  Empty,
  Descriptions,
  DescriptionsItem,
  Result,
  Timeline,
  TimelineItem,
  Link,
  Scrollbar,
];

components.forEach((component) => {
  Vue.use(component);
});

Vue.use(Loading.directive);
Vue.use(InfiniteScroll);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

import "@/assets/styles/index.scss";
import "./permission";

if (process.env.NODE_ENV === "development") {
  require("./mock");
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
