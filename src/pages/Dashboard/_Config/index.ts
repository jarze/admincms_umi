// import { SCREEN_COMPONENT_TYPE } from './type';
import { config as pieConfig } from './_pie';
import { config as lineConfig } from './_line';
import { config as barConfig } from './_bar';
import { config as singleConfig } from './_singleData';
import { config as customConfig } from './_customHtml';
// import { config as progressConfig } from './_progress';
import { config as listConfig } from './_list';

export default {
  PIE_CHART: pieConfig,
  LINE_CHART: lineConfig,
  BAR_CHART: barConfig,
  // PROGRESS_CHART: progressConfig,
  SINGLE_DATA: singleConfig,
  CUSTOM_HTML: customConfig,
  RANKING_LIST: listConfig,
  // SCROLL_LIST: listConfig,
};
