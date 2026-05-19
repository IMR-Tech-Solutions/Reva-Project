import React from 'react'
import Breadcrumb from '../Component/Breadcrumb'
import NewsPage from '../Component/NewsComponents/NewsPage'
import SEO from '../Component/SEO'

const News = () => {
  return (
    <>
      <SEO 
        title="News & Insights - Latest in Process Engineering"
        description="Stay updated with the latest news, technological insights, and engineering updates from REVA Process Technologies."
        keywords="process engineering news, chemical technology blog, industrial updates REVA"
      />
      <Breadcrumb />

      <NewsPage />

    </>
  )
}

export default News