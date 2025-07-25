

import {HiMiniArrowTrendingUp} from "react-icons/hi2";
import { GifState } from "../context/context";
const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-[#1e3c72] via-[#2a5298] to-[#1e3c72]", // Indigo Blue Wave
  },
  {
    title: "Stickers",
    value: "stickers",
    background:
      "bg-gradient-to-tr from-[#42275a] via-[#734b6d] to-[#42275a]", // Deep Plum Glow
  },
  {
    title: "Text",
    value: "text",
    background:
      "bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]", // Midnight Ocean
  },
];



const FilterGif = ({alignLeft = true, showTrending = false}) => {
  const {filter, setFilter} = GifState();

  return (
    <div
      className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "flex-col sm:flex-row sm:items-center justify-between "
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-blue-800" />
          )}
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}
      <div className="flex min-w-80 rounded-full bg-[#170353]">
        {filters.map((f) => {
          return (
            <span
              onClick={() => setFilter(f.value)}
              className={`${
                filter === f.value ? f.background : ""
              } font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer `}
              key={f.title}
            >
              {f.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;