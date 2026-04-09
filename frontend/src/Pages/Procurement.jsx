import React from 'react'
import MaintenanceHero from '../Component/MaintenanceComponents/MaintenanceHero.jsx'
import Breadcrumb from '../Component/Breadcrumb.jsx'
import MaintenanceServices from '../Component/MaintenanceComponents/MaintenanceServices.jsx'
import MaintenanceApproach from '../Component/MaintenanceComponents/MaintenanceApproach.jsx'
import MaintenanceBenefits from '../Component/MaintenanceComponents/MaintenanceBenefits.jsx'
import SupportServices from '../Component/MaintenanceComponents/SupportServices.jsx'
const Procurement = () => {
  return (
    <>
    <Breadcrumb />
    <MaintenanceHero/>
    <MaintenanceServices/>
    <MaintenanceApproach/>
    <SupportServices/>
    <MaintenanceBenefits/>
    </>
  )
}

export default Procurement