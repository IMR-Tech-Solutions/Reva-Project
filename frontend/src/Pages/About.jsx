import React, { useEffect, useState } from "react";
import HeroAbout from "../Component/AboutComponents/HeroAbout";
import Breadcrumb from "../Component/Breadcrumb";
import IndustriesSection from "../Component/HomeComponents/IndustriesSection";
import MissionValues from "../Component/AboutComponents/MissionValues";
import Team from "../Component/AboutComponents/Team";
import WhyChooseUs from "../Component/AboutComponents/WhyChooseUs";
import TestimonialsSection from "../Component/HomeComponents/TestimonialsSection";
import aboutApi from "../services/aboutApi";
import GlobalPresenceSection from "../Component/HomeComponents/GlobalPresenceSection";

const About = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await aboutApi.getAboutFull();
                setData(res);
            } catch (err) {
                console.error("About fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-medium">Loading About Reva...</p>
        </div>
    </div>;

    const { content, team, values, differentiators, testimonials } = data || {};

    return (
        <div className="bg-white overflow-hidden">
            <Breadcrumb />
            <HeroAbout content={content} />
            {/* IndustriesSection remains static as requested */}
            <IndustriesSection />
            <MissionValues content={content} values={values} />
            <Team content={content} team={team} />
            <WhyChooseUs content={content} differentiators={differentiators} />
            <GlobalPresenceSection/>
            
            <TestimonialsSection testimonials={testimonials} />
        </div>
    );
};

export default About;
