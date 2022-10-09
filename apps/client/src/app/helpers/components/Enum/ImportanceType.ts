import {withAsyncSelect2, withInput} from '@emms/ui-kit';
import {getAsyncImportanceType} from "./service";

const SelectImportanceType = withInput(withAsyncSelect2(getAsyncImportanceType));
export {SelectImportanceType}
