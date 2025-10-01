import PublicationsList from "@/components/post/publication-list";
import Newsletter from "@/components/shared/news-letter";
import PageHeader from "@/components/shared/page-header";
import { getAllPublications } from "@/lib/mdx";

export default function PublicationsPage() {
    const allPosts = getAllPublications();
  
  const publicationsFrontmatter = allPosts.map(post => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...frontmatter } = post;
    return frontmatter;
  });
    return (<>
        {/* Hero section */}        
        <PageHeader title="Publications" />        
        
        {/* Publication listing */}
        <PublicationsList publications={publicationsFrontmatter} />

        {/* Newsletter section */}
        <Newsletter />
    </>)
}