import Contact from "@/components/home/contact";
// import FeaturedRoles from "@/components/home/featured-roles";
import Hero from "@/components/home/hero";
import Publications from "@/components/home/publications";
import FeaturedRolesSection from "@/components/home/roles/featured-roles";
import Newsletter from "@/components/shared/news-letter";

export default function Home() {
  return (<>
    {/* Hero section */}   
    <Hero />

    {/* Publications section */}
    <Publications />
    
    {/* FeaturedRoles section */}
    {/* <FeaturedRoles /> */}
    <FeaturedRolesSection />

    {/* Contact section */}
    <Contact />

    {/* Newsletter section */}
    <Newsletter />
    
  </>);
}
