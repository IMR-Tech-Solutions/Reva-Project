import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TechnologyLayout from "./TechnologyLayout";
import { getTechnologyBySlug } from "../services/technologiesApi";
import SEO from "../Component/SEO";

const TechnologyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnology = async () => {
      try {
        setLoading(true);
        const data = await getTechnologyBySlug(slug);
        setTechnology(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch technology:", err);
        setError("Technology not found or error loading data.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTechnology();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-xl font-semibold text-primary">Loading technology details...</div>
      </div>
    );
  }

  if (error || !technology) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Oops!</h2>
        <p className="text-gray-600 mb-8">{error || "The technology you're looking for doesn't exist."}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const techSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": technology.title,
    "description": technology.herosub || technology.paragraph1 || "",
    "provider": {
      "@type": "Organization",
      "name": "REVA Process Technologies",
      "url": "https://revaprocess.in"
    }
  };

  return (
    <>
      <SEO 
        title={`${technology.title} Technology`}
        description={technology.herosub || technology.paragraph1 || `Learn about REVA's advanced ${technology.title} process technology solutions.`}
        keywords={`${technology.title}, process technology, industrial engineering, chemical process`}
        schema={techSchema}
      />
      <TechnologyLayout
        title={technology.title}
        herotitle={technology.herotitle}
        herosub={technology.herosub}
        paragraph1={technology.paragraph1}
        paragraph2={technology.paragraph2}
        img={technology.img}
        keysubheading={technology.keysubheading}
        features={technology.features}
        stats={technology.stats}
      />
    </>
  );
};

export default TechnologyDetail;
