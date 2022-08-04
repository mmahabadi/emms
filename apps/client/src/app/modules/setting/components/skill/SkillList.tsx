import {FC, useEffect} from "react";
import {getSkills} from "../../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Skill, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../../helpers/queries";
import {SkillFilter} from "../skill/SkillFilter";
import {SkillEntryForm} from "../skill/SkillEntryForm";

export const SkillList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: SkillEntryForm, isLarge: true});
  }, []);

  const columns = [
    { Header: 'GENERAL.CODE', accessor: 'code'},
    { Header: 'GENERAL.NAME', accessor: 'name'}
  ] as DataTableColumn[];

  const toolbar = [
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />,
      text: 'GENERAL.ADD',
      click: () => {
        updateModalConfig({show: true, title: 'SETTING.LOCATION.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Skill) => {
        updateModalConfig({show: true, title: 'SETTING.SKILL.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.SKILL_LIST}
      getData={getSkills}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={SkillFilter}
      actions={actions}
    />
  )
}
