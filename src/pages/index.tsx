import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { get } from '@/utils';
import { Story, TopStories, User } from '@/types';

export const getServerSideProps = async () => {
  const topStories = await get<TopStories>(`${process.env.HACKERNEWS_ENDPOINT_BASE_URL}/topstories.json`)
  const topStoriesData = await Promise.allSettled(topStories.slice(0, 10).map(
    async (id) => {
      return get<Story>(`${process.env.HACKERNEWS_ENDPOINT_BASE_URL}/item/${id}.json`)
    }
  ))

  const topStoriesDataWithUserData = await Promise.allSettled(topStoriesData.map(async (storyObj) => {
    if (storyObj.status === 'rejected') return
    const userData = await get<User>(`${process.env.HACKERNEWS_ENDPOINT_BASE_URL}/user/${storyObj.value.by}.json`)

    return { ...storyObj.value, by: { ...userData } }
  }))

  return {
    props: {
      topStoriesDataWithUserData
    },
  }
}

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
console.log(props.topStoriesDataWithUserData);

  return (
    <>
      <Head>
        <title>Hacker newz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      </main>
    </>
  )
}




export default Home
