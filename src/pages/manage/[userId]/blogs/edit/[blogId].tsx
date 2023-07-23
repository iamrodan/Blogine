import ManagePage from "@/pages/manage";
import { API } from "../../../../../../services/api";

type EditBlogProps = {
  blog: {
    _id: string;
    title: string;
    description: string;
  };
};

export default function EditBlog({ blog }: EditBlogProps) {
  return (
    <ManagePage>
      <div>EditBlog {blog._id}</div>
    </ManagePage>
  );
}

export async function getServerSideProps({ params }: any) {
  const { blogId } = params;
  console.log(params);
  const response = await API.get(`/blogs/${blogId}`);
  const blog = response.data;

  return {
    props: {
      blog,
    },
  };
}
