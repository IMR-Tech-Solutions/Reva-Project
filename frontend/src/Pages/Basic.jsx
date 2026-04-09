import React from 'react'
import Breadcrumb from '../Component/Breadcrumb'
import EPCHero from '../Component/EpcComponent/EPCHero'
import EPCServices from '../Component/EpcComponent/EPCServices'
import ProjectLifecycle from '../Component/EpcComponent/ProjectLifecycle'
import EPCIndustries from '../Component/EpcComponent/EPCIndustries'
import Differentiators from '../Component/EpcComponent/Differentiators'

const EPC = () => {
  return (
    <>
    <Breadcrumb />
    <EPCHero />
    <EPCServices />
    <ProjectLifecycle />
    <EPCIndustries />
    <Differentiators />


    </>
  )
}

export default EPC