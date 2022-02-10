import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";

export const items = [
  {
    title: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Search",
    icon: <SearchIcon className="h-5 w-5" />,
  },
  {
    title: "Your Library",
    icon: <LibraryIcon className="h-5 w-5" />,
  },
];

export const items2 = [
  {
    title: "Created Playlist",
    icon: <PlusCircleIcon className="h-5 w-5" />,
  },
  {
    title: "Liked Songs",
    icon: <HeartIcon className="h-5 w-5" />,
  },
  {
    title: "Your episodes",
    icon: <RssIcon className="h-5 w-5" />,
  },
];
