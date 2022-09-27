import {withAsyncSelect, withInput, withSelect} from "@emms/ui-kit";

const getAsyncValues = async (q: string) => {
  return [
    {name:'P01', id:"0"},
    {name:'P02', id:"1"},
    {name:'P03', id:"2"},
    {name:'P04', id:"3"},
    {name:'P05', id:"4"},
    {name:'P06', id:"5"},
    {name:'P07', id:"6"}];
}
const SelectImportanceType = withInput(withSelect(getAsyncValues));
export {SelectImportanceType}


