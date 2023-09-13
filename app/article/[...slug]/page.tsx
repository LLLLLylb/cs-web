'use client';
import Articles from "@/components/articles/articles";

const ArticlePage = ({ params }: { params: { slug: string[] } }) => {


  return (
    <div>
      {/* <Articles parentId={params.slug[0]} catalogueId={params.slug[1]}  index={params.slug[2]} id={params.slug[3]} /> */}
      <Articles   id={params.slug[0]} />
    </div>
  );
};

export default ArticlePage;
