import PublicationsList from "@/components/post/publication-list";
import Newsletter from "@/components/shared/news-letter";
import PageHeader from "@/components/shared/page-header";
import { getAllPublications } from "@/lib/mdx";

export default function PublicationsPage() {  
  const publicationsFrontmatter = getAllPublications();
   
    return (<>
      {/* Hero section */}  
        <div className='grid grid-cols-1 lg:grid-cols-5'>
				  {/* empty space */}
          <div className='hidden lg:block lg:col-span-2'></div>
          <div className='lg:col-span-3 max-w-[572px] md:mx-auto md:-ml-20 px-6 md:px-0'>

          <PageHeader title="Publications" />        
          </div>
        </div>
        
        {/* Publication listing */}
        <PublicationsList publications={publicationsFrontmatter} />

        {/* Newsletter section */}
        <Newsletter />
    </>)
}