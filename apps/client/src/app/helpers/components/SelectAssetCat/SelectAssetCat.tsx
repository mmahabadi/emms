import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncAssetCategories} from "./service";

const SelectAssetCat = withInput(withAsyncSelect(getAsyncAssetCategories));
export {SelectAssetCat}
