import {withAsyncSelect, withInput, withSelect} from "@emms/ui-kit";

const getAsyncValues = async (q: string) => {
  return [
    {name:'TW3CM', id:"0"},
    {name:'W1EM', id:"1"},
    {name:'W2CM', id:"2"},
    {name:'W3PM', id:"3"},
    {name:'W4IM', id:"4"}];
}
const SelectRequestType = withInput(withSelect(getAsyncValues));
export {SelectRequestType}


