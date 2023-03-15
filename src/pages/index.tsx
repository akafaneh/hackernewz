import Head from "next/head";
import styles from "@/styles/home.module.scss";
import { InferGetServerSidePropsType } from "next";
import { get } from "@/utils";
import { Story, TopStories, User } from "@/types";
import StoryCard from "@/components/cards/story-card";

export const getServerSideProps = async () => {
  const topStories = await get<TopStories>(`${process.env.HACKERNEWS_ENDPOINT_BASE_URL}/topstories.json`);
  //Shuffled to get random 10 stories instead of the top 10
  //Also i know this is not super "random" and can be not smart for big arrays, but for this case it will do
  const topStoriesShuffled = topStories.sort(() => 0.5 - Math.random()).slice(0, 10);

  const topStoriesData = await Promise.allSettled(
    topStoriesShuffled.map(async (id) => {
      return get<Story>(`${process.env.HACKERNEWS_ENDPOINT_BASE_URL}/item/${id}.json`);
    })
  );

  topStoriesData.sort(function (a, b) {
    if (a.status === "rejected" || b.status === "rejected") return 0;
    return b.value.score - a.value.score;
  });

  const topStoriesDataWithUserData = await Promise.allSettled(
    topStoriesData.map(async (storyObj) => {
      if (storyObj.status === "rejected") return;
      const userData = await get<User>(`${process.env.HACKERNEWS_ENDPOINT_BASE_URL}/user/${storyObj.value.by}.json`);

      return { ...storyObj.value, by: { ...userData } };
    })
  );

  return {
    props: {
      topStoriesDataWithUserData,
    },
  };
};

const Home = ({ topStoriesDataWithUserData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Hacker newz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {topStoriesDataWithUserData.map((story) => {
          if (story.status === "rejected" || !story.value) return "x";
          const {
            id,
            title,
            score,
            url,
            time,
            by: { id: authorId, karma },
          } = story.value;
          return (
            <StoryCard
              className={styles.story}
              timestamp={time}
              url={url}
              key={id}
              authorId={authorId}
              authorKarmaScore={karma}
              title={title}
              score={score}
            />
          );
        })}
      </main>
    </>
  );
};

export default Home;
