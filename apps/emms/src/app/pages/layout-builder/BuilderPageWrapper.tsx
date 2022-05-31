import React, {FC} from 'react'
import {BuilderPage} from './BuilderPage'
import {PageTitle} from "@emms/ui-kit";

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
