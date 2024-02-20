import Link from "next/link";

import { fetchWrapper } from "@/utils/fetchWrapper";
import type { IAnimeData } from "@/types/anime";
import type { IMangeData } from "@/types/manga";

import MediaSlider from "./components/MediaSlider";

const getAnime = async (): Promise<IAnimeData> => {
  const res = await fetchWrapper<IAnimeData>('/anime?order_by=score&sort=desc')
  return res
}

const getMange = async (): Promise<IMangeData> => {
  const res = await fetchWrapper<IMangeData>('/manga?order_by=score&sort=desc')
  return res
}

export default async function Home() {

  const [anime, manga] = await Promise.all([getAnime(), getMange()])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <MediaSlider type='anime' data={anime.data}/> 
      <Link
        href="/anime"
        className="group mt-10 mb-32 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Anime{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Click to read more
        </p>
      </Link>
      <MediaSlider type='manga' data={manga.data}/>
      <Link
        href="manga"
        className="group mt-10 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Manga{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Click to read more
        </p>
      </Link>
    </main>
  );
}
