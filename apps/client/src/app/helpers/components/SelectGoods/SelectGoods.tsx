import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncGoods} from "../SelectGoods/service";

const SelectGoods = withInput(withAsyncSelect(getAsyncGoods));
export {SelectGoods}
