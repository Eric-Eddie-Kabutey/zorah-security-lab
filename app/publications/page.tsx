import PublicationsList from "@/components/post/publication-list";
import Newsletter from "@/components/shared/news-letter";
import PageHeader from "@/components/shared/page-header";
import { getAllPublications } from "@/lib/mdx";

export default function PublicationsPage() {  
  const publicationsFrontmatter = getAllPublications();
   
    return (<>
        {/* Hero section */}        
        <PageHeader title="Publications" />        
        
        {/* Publication listing */}
        <PublicationsList publications={publicationsFrontmatter} />

        {/* Newsletter section */}
        <Newsletter />
    </>)
}