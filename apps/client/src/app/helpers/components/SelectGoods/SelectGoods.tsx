import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncActivities} from "./service";

const SelectGoods = withInput(withAsyncSelect(getAsyncActivities));
export {SelectGoods}
