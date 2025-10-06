import FilterableGallery from "@/components/gallery/filterable-service-gallery";
import PageHeader from "@/components/shared/page-header";
import { allServiceCategories } from "@/data/service-category-data";

export default function GalleryPage() {
    // The data is fetched on the server from your static data file.
    const categories = allServiceCategories;
    
    return (<>
        {/* Hero section */}
        <PageHeader title="Gallery" />

        {/* Flittered service section */}       
        <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto py-16 md:py-24 px-6">
          <FilterableGallery categories={categories} />
        </div>
    </>)
}