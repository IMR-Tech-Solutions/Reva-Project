import React from 'react'
import GetInTouchSection from '../Component/HomeComponents/GetInTouchSection'
import Breadcrumb from '../Component/Breadcrumb'
import ContactMapSection from '../Component/ContactComponents/ContactMapSection'
import SEO from '../Component/SEO'

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with REVA Process Technologies. Contact our Pune corporate headquarters for sales inquiries, process engineering consultations, or career opportunities."
        keywords="contact REVA, engineering consultations, REVA Pune office, contact chemical engineering, sales inquiry"
      />
      <Breadcrumb />
      <GetInTouchSection />
      <ContactMapSection />
    </>
  )
}

export default Contact