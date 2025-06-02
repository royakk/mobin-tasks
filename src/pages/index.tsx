import { Link } from "react-router";

const Home = () => {
  return (
    <div className="font-sans text-base font-normal space-x-4">
      <Link
        to="video-trimmer"
        className="inline-block min-w-40 px-4 py-2 bg-gray-300 text-white rounded  transition "
      >
        Video Trimmer
      </Link>
      <Link
        to="poll"
        className="inline-block min-w-40 px-4 py-2 bg-gray-300 text-white rounded transition "
      >
        Poll
      </Link>
    </div>
  );
};

export default Home;
