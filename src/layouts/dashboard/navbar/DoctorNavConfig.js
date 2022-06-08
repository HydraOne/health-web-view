// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import axios from "../../../utils/axios";

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const doctorNavConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      { title: '健康咨询', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: '健康信息管理', path: PATH_DASHBOARD.eCommerce.healthInfo, icon: ICONS.chat },
      { title: '体检订单管理', path: PATH_DASHBOARD.eCommerce.order, icon: ICONS.chat },
      { title: '健康计划管理', path: PATH_DASHBOARD.eCommerce.healthProgram, icon: ICONS.calendar },
      { title: '膳食计划管理', path: PATH_DASHBOARD.eCommerce.healthRecipes, icon: ICONS.calendar }
    ],
  },
];

export default doctorNavConfig;
