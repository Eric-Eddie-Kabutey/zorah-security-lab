import PageHeader from "@/components/shared/page-header";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function ProductPage() {
    return (
        <>

            <PageHeader title="Product" />

            <section className="flex-1 max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-6 pb-24 relative z-10">
                <div className="max-w-3xl">
                    <h2 className="text-xl font-bold uppercase text-gray-900">
                        Coming Soon
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium mb-12">
                        We are currently finalizing our suite of specialized security products.
                        Check back soon for cutting-edge solutions in digital forensics,
                        cyber defence, and strategic asset protection.
                    </p>
                </div>
            </section>
        </>
    )
}