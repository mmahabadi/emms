import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncAssets} from "./service";

const SelectAsset = withInput(withAsyncSelect(getAsyncAssets));
export {SelectAsset}
