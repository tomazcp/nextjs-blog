import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log("pages/posts/[foo].js => getStaticPaths()");
  console.log(paths);
  console.log("############ END getStaticPaths() #############");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("pages/posts/[foo].js => getStaticProps()");
  const postData = await getPostData(params.foo);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
