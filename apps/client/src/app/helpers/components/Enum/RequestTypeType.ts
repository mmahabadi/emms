import {withAsyncSelect2, withInput} from '@emms/ui-kit';
import {getAsyncRequestType} from "./service";

const SelectRequestType = withInput(withAsyncSelect2(getAsyncRequestType));
export {SelectRequestType}
