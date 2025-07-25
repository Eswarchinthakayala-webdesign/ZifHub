import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gif from "../components/gif";
import FollowOn from "../components/follow-on";

import { HiOutlineExternalLink } from "react-icons/hi";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import { GifState } from "../context/context";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [copied, setCopied] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }

    const fetchGif = async () => {
      const gifId = slug.split("-");
      const { data } = await gf.gif(gifId[gifId.length - 1]);
      const { data: related } = await gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setGif(data);
      setRelatedGifs(related);
    };

    fetchGif();
  }, []);

 const shareGif = () => {
    if (!gif?.url) return;

    if (navigator.share) {
      navigator
        .share({
          title: gif.title || "Check out this GIF!",
          url: gif.url,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed", error));
    } else {
      navigator.clipboard
        .writeText(gif.url)
        .then(() => alert("GIF URL copied to clipboard"))
        .catch(() => alert("Failed to copy"));
    }
  };

  return (
    <div className="grid grid-cols-4 my-10 gap-4 text-white">
      {/* LEFT SIDEBAR */}
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14 rounded-full"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-400 text-sm">
                  @{gif?.user?.username}
                </div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center text-indigo-400 cursor-pointer hover:underline"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />

        <div className="border-t border-gray-700 my-4" />

        {gif?.source && (
          <div>
            <span className="text-gray-400 text-sm">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={20} />
              <a
                href={gif.source}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
              >
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* MAIN GIF SECTION */}
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6 flex-col sm:flex-row">
          <div className="w-full sm:w-3/4">
            <div className="text-gray-400 text-sm truncate mb-2">
              {gif.title}
            </div>
            <Gif gif={gif} hover={false} />

            {/* Mobile User Info */}
            <div className="flex sm:hidden items-center gap-2 mt-3">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">
                  {gif?.user?.display_name}
                </div>
                <div className="text-sm text-gray-400">
                  @{gif?.user?.username}
                </div>
              </div>

              <button
                className="ml-auto hover:text-pink-500 transition"
                onClick={shareGif}
              >
                <FaPaperPlane size={22} />
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-5 mt-6 w-full sm:w-auto">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-4 items-center font-bold text-lg group hover:text-red-400 cursor-pointer"
            >
              <HiMiniHeart
                size={28}
                className={`transition ${
                  favorites.includes(gif.id)
                    ? "text-red-500"
                    : "group-hover:text-red-400"
                }`}
              />
              Favorite
            </button>

            <button
              onClick={shareGif}
              className="flex gap-4 items-center font-bold text-lg group hover:text-blue-500 cursor-pointer"
            >
              <FaPaperPlane
                size={22}
                className="transition group-hover:text-blue-400"
              />
              Share
            </button>

            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="flex gap-4 items-center font-bold text-lg group hover:text-purple-500 cursor-pointer"
            >
              <IoCodeSharp
                size={26}
                className="transition group-hover:text-purple-400"
              />
              Embed
            </button>

            {/* EMBED BOX */}
            {showEmbed && (
              <div className="mt-2 p-4 bg-[#1e1e2f] border border-gray-600 rounded-lg max-w-md text-sm text-gray-300">
                <div className="mb-2 font-semibold">Embed Code:</div>
                <textarea
                  readOnly
                  className="w-full bg-transparent border border-gray-500 rounded p-2 text-white font-mono resize-none"
                  rows={4}
                  value={`<iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="mt-2 px-3 py-1 bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-600 text-white rounded hover:opacity-90 transition"
                >
                  {copied ? "Copied!" : "Copy Embed Code"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RELATED GIFS */}
        <div className="mt-8">
          <span className="font-extrabold text-lg mb-2 block">
            Related GIFs
          </span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
