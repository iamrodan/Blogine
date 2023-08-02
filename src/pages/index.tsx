import LinkButton from "@/components/atoms/LinkButton";
import SearchBar from "@/components/atoms/SearchBar";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { API } from "../../services/api";
import { useRouter } from "next/router";
import { url } from "inspector";

type Post = {
  _id: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
};

type HomeProps = {
  blogs: Array<Post>;
};

export default function Home({ blogs: blogsData }: HomeProps) {
  // Todo: make the blog search actually from backend at blogs/search?keyword="keyword"
  const [blogs, setBlogs] = useState<Post[]>(blogsData);
  const [isSearchResults, setIsSearchResults] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (searchKey: string) => {
    if (!searchKey) {
      setIsSearchResults(false);
      setBlogs(blogsData);
      return;
    }
    setIsSearchResults(true);
    setBlogs(
      blogs.filter((post) =>
        post.title.toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  };

  return (
    <div>
      <main className="flex justify-between flex-col pt-20 px-0 lg:px-20 pb-10 box-border">
        <section className="flex flex-col items-center justify-center">
          <SearchBar handleSearch={handleSearch} />
          <div className="w-full flex flex-col items-center justify-start">
            <p className="m-2 lg:m-4 border-b border-gray-400">
              {isSearchResults &&
                `${blogs.length} ${
                  blogs.length > 1 ? "results" : "result"
                } found`}
            </p>
            <div className="w-full lg:w-3/4">
              {blogs.map((blog) => (
                <div
                  key={blog.title}
                  className="m-4 flex flex-col p-5 border border-gray-400 rounded-md hover:cursor-pointer"
                  onClick={() => {
                    router.push(`/blogs/${blog._id}`);
                  }}
                >
                  <div className="text-2xl hover:underline">{blog.title}</div>
                  <p className="py-2">{blog.description.slice(0, 100)}...</p>
                  <div className="text-slate-600 text-sm uppercase flex w-full justify-between my-4">
                    By {blog.author}
                    <span className="text-slate-500 blogercase underline">
                      {new Date(blog.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await API.get(`/blogs`);

  return {
    props: {
      blogs: response?.data,
    },
  };
}
