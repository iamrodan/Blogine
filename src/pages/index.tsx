import LinkButton from "@/components/atoms/LinkButton";
import SearchBar from "@/components/atoms/SearchBar";
import { Navbar } from "@/components/molecules/Navbar";
import Header from "@/components/organisms/Header";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

type Post = {
  title: string;
  description: string;
  author: string;
  created_at: string;
};

const POSTS: Post[] = [
  {
    title: "Doraemon: The Robotic Cat from the Future",
    description:
      "Doraemon is a famous Japanese manga and anime series written and illustrated by Fujiko F. Fujio. The story revolves around a robotic cat named Doraemon, who travels back in time from the 22nd century to help a young boy named Nobita Nobi with his everyday problems.",
    author: "Fujiko F. Fujio",
    created_at: "2023-07-22",
  },
  {
    title: "Ninja Hattori: The Master of Disguise",
    description:
      "Ninja Hattori is a popular Japanese manga and anime series created by Fujiko A. Fujio. The story follows a young ninja named Hattori Kanzo, who comes to live with a young boy named Kenichi Mitsuba. Hattori uses his ninja skills to help Kenichi and protect him from bullies.",
    author: "Fujiko A. Fujio",
    created_at: "2023-07-22",
  },
  {
    title: "Kung Fu Panda: The Warrior Panda",
    description:
      "Kung Fu Panda is an animated film franchise created by DreamWorks Animation. The story follows Po, a lovable but clumsy giant panda who dreams of becoming a kung fu master. Po's life takes a surprising turn when he is unexpectedly chosen as the Dragon Warrior and must train with the Furious Five to protect the Valley of Peace.",
    author: "DreamWorks Animation",
    created_at: "2023-07-22",
  },
  {
    title: "The Great Adventure of Captain Chocolava",
    description:
      "Captain Chocolava, the brave chocolate superhero, travels the world to bring joy and sweetness to all with his delicious chocolate powers!",
    author: "Chocolate Factory",
    created_at: "2023-07-22",
  },
  {
    title: "The Quest for the Elusive Rainbow Unicorn",
    description:
      "Join our brave adventurers in their search for the mythical rainbow unicorn that grants wishes and spreads colorful magic!",
    author: "Unicorn Enthusiast",
    created_at: "2023-07-22",
  },
  {
    title: "The Misadventures of Mr. Bumblebee",
    description:
      "Mr. Bumblebee is a clumsy yet endearing little bee who stumbles upon hilarious situations while collecting nectar for his hive.",
    author: "Buzzworthy Tales",
    created_at: "2023-07-22",
  },
  {
    title: "Secrets of the Enchanted Forest",
    description:
      "The Enchanted Forest is home to mystical creatures and hidden treasures. Join our brave explorers as they uncover its secrets!",
    author: "Mysterious Wanderer",
    created_at: "2023-07-22",
  },
  {
    title: "Zany Circus Spectacular",
    description:
      "Step right up and witness the wildest circus show on Earth! Prepare to be amazed by acrobats, clowns, and daring animal acts!",
    author: "Circus Extravaganza",
    created_at: "2023-07-22",
  },
  {
    title: "The Epic Robot Dance-Off",
    description:
      "In a futuristic world, robots challenge each other to a dance-off like you have never seen before! Who will win the ultimate robot dance battle?",
    author: "Robo Groove",
    created_at: "2023-07-22",
  },
  {
    title: "The Gigantic Ice Cream Festival",
    description:
      "Visit the ice cream wonderland where giant scoops and toppings tower over the landscape. Indulge in endless frozen delights!",
    author: "Ice Cream Dreamland",
    created_at: "2023-07-22",
  },
  {
    title: "The Secret Language of Animals",
    description:
      "Discover the magical world where animals communicate through a secret language! Join our young protagonist on this extraordinary adventure.",
    author: "Animal Whisperer",
    created_at: "2023-07-22",
  },
  {
    title: "Pirate Pug and the Treasure Hunt",
    description:
      "Ahoy, matey! Join Pirate Pug and his loyal crew on a swashbuckling adventure to find the hidden treasure buried on a mysterious island.",
    author: "Captain Pugbeard",
    created_at: "2023-07-22",
  },
  {
    title: "Galactic Gourmet: A Space Food Odyssey",
    description:
      "Embark on a culinary journey through space with the Galactic Gourmet as he discovers unique intergalactic recipes and exotic flavors!",
    author: "Cosmic Cuisine",
    created_at: "2023-07-22",
  },
  {
    title: "test",
    description: "test",
    author: "Cosmic Cuisine",
    created_at: "2023-07-22",
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [isSearchResults, setIsSearchResults] = useState<boolean>(false);

  const handleSearch = (searchKey: string) => {
    if (!searchKey) {
      setIsSearchResults(false);
      return;
    }
    setIsSearchResults(true);
    setPosts(
      POSTS.filter((post) =>
        post.title.toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Header />
      <main className="flex justify-between flex-col pt-20 px-20 pb-10 box-border">
        <section className="flex flex-col items-center justify-center">
          <SearchBar handleSearch={handleSearch} />
          <div className="w-full flex flex-col items-center justify-start">
            <p className="m-4 border-b border-gray-400">
              {isSearchResults &&
                `${posts.length} ${
                  posts.length > 1 ? "results" : "result"
                } found`}
            </p>
            <div className="w-3/4">
              {posts.map((post) => (
                <div
                  key={post.title}
                  className="m-4 flex flex-col p-5 border border-gray-400 rounded-md"
                >
                  <div className="text-2xl">{post.title}</div>
                  <p className="py-2">{post.description.slice(0, 100)}...</p>
                  <div className="flex w-full justify-end items-center">
                    <LinkButton
                      label="Read full article"
                      url=""
                      className="border-slate-500 text-slate-500 hover:text-slate-700 hover:border-slate-700"
                    >
                      <AiOutlineArrowRight />
                    </LinkButton>
                  </div>
                  <div className="text-slate-600 text-sm uppercase flex w-full justify-between my-4">
                    By {post.author}
                    <span className="text-slate-500 uppercase underline">
                      {post.created_at}
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
