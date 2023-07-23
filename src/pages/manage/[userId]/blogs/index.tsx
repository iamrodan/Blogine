import Link from "next/link";
import ManagePage from "../..";
import { API } from "../../../../../services/api";

type BlogsPageProps = {
  blogs: {
    _id: string;
    title: string;
  }[];
  userId: string;
};

export default function ManageUserBlogs({ blogs, userId }: BlogsPageProps) {
  return (
    <ManagePage>
      <div className="flex flex-col">
        <div className="text-3xl">Blogs</div>
        <div className="mt-5">
          {blogs.map((blog) => (
            <div key={blog._id} className="hover:underline">
              <Link href={`/manage/${userId}/blogs/edit/${blog._id}`}>
                {blog.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ManagePage>
  );
}

export async function getServerSideProps({ params }: any) {
  const { userId } = params;
  const response = await API.get(`/blogs/user/${userId}`);
  const blogs = response.data;

  return {
    props: {
      blogs,
      userId,
    },
  };
}
