import {AuthModel, ID} from "@emms/models";
import {getAuth} from "@emms/ui-kit";

const getUserOrgId = (): ID => {
  const auth: AuthModel | undefined = getAuth();
  const organization = auth?.orgs?.pop();
  return organization?.orgId;
}

export {getUserOrgId}
