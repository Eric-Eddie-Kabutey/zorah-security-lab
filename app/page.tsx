import Contact from "@/components/home/contact";
// import FeaturedRoles from "@/components/home/featured-roles";
import Hero from "@/components/home/hero";
// import Publications from "@/components/home/publications";
import Newsletter from "@/components/shared/news-letter";

export default function Home() {
  return (<>
    {/* Hero section */}   
    <Hero />

    {/* Publications section */}
    {/* <Publications /> */}
    
    {/* FeaturedRoles section */}
    {/* <FeaturedRoles /> */}

    {/* Contact section */}
    <Contact />

    {/* Newsletter section */}
    <Newsletter />
    
  </>);
}
