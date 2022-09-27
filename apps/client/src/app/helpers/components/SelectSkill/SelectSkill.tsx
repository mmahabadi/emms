import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncSkills} from "./service";

const SelectSkill = withInput(withAsyncSelect(getAsyncSkills));
export {SelectSkill}
