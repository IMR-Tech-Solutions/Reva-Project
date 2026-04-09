import React from 'react'
import ManufacturingHero from '../Component/ManufacturingComponents/ManufacturingHero'
import Breadcrumb from '../Component/Breadcrumb'
import ManufacturingServices from '../Component/ManufacturingComponents/manufacturingServices'
import ManufacturingFacilities from '../Component/ManufacturingComponents/ManufacturingFacilities'
import ManufacturingProcess from '../Component/ManufacturingComponents/ManufacturingProcess'
import MaterialStandards from '../Component/ManufacturingComponents/MaterialStandards'
import ManufacturingAdvantages from '../Component/ManufacturingComponents/ManufacturingAdvantages'

const Manufacturing = () => {
  return (
    <>
    <Breadcrumb  />
   <ManufacturingHero />
   <ManufacturingServices />
   <ManufacturingFacilities />
    <MaterialStandards />
   <ManufacturingProcess />
   <ManufacturingAdvantages />
  

    </>
  )
}

export default Manufacturing