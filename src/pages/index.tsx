import LinkButton from "@/components/atoms/LinkButton";
import SearchBar from "@/components/atoms/SearchBar";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { API } from "../../services/api";

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
      <main className="flex justify-between flex-col pt-20 px-20 pb-10 box-border">
        <section className="flex flex-col items-center justify-center">
          <SearchBar handleSearch={handleSearch} />
          <div className="w-full flex flex-col items-center justify-start">
            <p className="m-4 border-b border-gray-400">
              {isSearchResults &&
                `${blogs.length} ${
                  blogs.length > 1 ? "results" : "result"
                } found`}
            </p>
            <div className="w-3/4">
              {blogs.map((blog) => (
                <div
                  key={blog.title}
                  className="m-4 flex flex-col p-5 border border-gray-400 rounded-md"
                >
                  <div className="text-2xl">{blog.title}</div>
                  <p className="py-2">{blog.description.slice(0, 100)}...</p>
                  <div className="flex w-full justify-end items-center">
                    <LinkButton
                      label="Read full article"
                      url={`/blogs/${blog._id}`}
                      className="border-slate-500 text-slate-500 hover:text-slate-700 hover:border-slate-700"
                    >
                      <AiOutlineArrowRight />
                    </LinkButton>
                  </div>
                  <div className="text-slate-600 text-sm uppercase flex w-full justify-between my-4">
                    By {blog.author}
                    <span className="text-slate-500 blogercase underline">
                      {blog.created_at}
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
