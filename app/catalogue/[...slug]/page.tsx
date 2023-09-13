'use client';
import Catalogue from "@/components/catalogue/catalogue";

const CataloguePage = ({ params }: { params: { slug: string[] } }) => {


  return (
    <div>
      <Catalogue parentId={params.slug[0]} id={params.slug[1]} index={params.slug[2]}/>
    </div>
  );
};

export default CataloguePage;
