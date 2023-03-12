import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { GetServerSideProps } from 'next'


const Home = (props) => {
  console.log(props);
  
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const topStories = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  const topStoriesJson = await topStories.json()
  return {
    props: {
      topStoriesJson
    }, // will be passed to the page component as props
  }
}


export default Home
