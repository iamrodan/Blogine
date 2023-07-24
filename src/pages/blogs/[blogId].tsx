import { API } from "../../../services/api";

type BlogPageProps = {
  blog: {
    _id: string;
    title: string;
    description: string;
    author: string;
    created_at: string;
  };
};

export default function BlogPage({ blog }: BlogPageProps) {
  return (
    <div className="px-20">
      <div className="text-2xl mb-10">{blog.title}</div>
      <div>{blog.description}</div>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const { blogId } = params;
  const response = await API.get(`/blogs/${blogId}`);
  const blog = response.data;

  return {
    props: {
      blog,
    },
  };
}
