import Breadcrumbs from "@/components/catalogue/breadcrumbs";
import VerticalNav from "@/components/catalogue/verticalNav";

export default function  CatalogueLayout({ children,params }: { children: React.ReactNode ,params: { slug: string[] }}) {
    return (
        <div>
            <div className="hidden sm:block bg-[url('/images/theme2.png')] bg-cover bg-bottom">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-start relative h-[100px] sm:h-[150px] lg:h-[300px]">
                        <VerticalNav parentId={params.slug[0]} id={params.slug[1]} index={params.slug[2]}/>
                        <Breadcrumbs parentId={params.slug[0]} id={params.slug[1]} index={params.slug[2]}/>
                    </div>
                </div>
            </div>
            {children}
        
        </div>
    );
  }
  