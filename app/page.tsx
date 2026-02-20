import Contact from "@/components/home/contact";
// import FeaturedRoles from "@/components/home/featured-roles";
import Hero from "@/components/home/hero";
import Publications from "@/components/home/publications";
import FeaturedRolesSection from "@/components/home/roles/featured-roles";
import Newsletter from "@/components/shared/news-letter";
import WaveDivider2 from "@/components/svg/wave-divider2";

export default function Home() {
  return (<>
    {/* Hero section */}
    <Hero />

    {/* Divider section */}
    {/* <Divider /> */}
    <WaveDivider2 />

    {/* Publications section */}
    <Publications />

    {/* Divider section */}
    {/* <Divider /> */}

    {/* FeaturedRoles section */}
    {/* <FeaturedRoles /> */}
    <FeaturedRolesSection visible={true} />

    {/* Divider section */}
    {/* <Divider /> */}
    {/* Contact section */}
    <Contact />

    {/* Newsletter section */}
    <Newsletter />

  </>);
}
