import { GetStaticProps, GetStaticPaths } from 'next';
import blogPosts from '../../components/blog/entries.json';
import Layout from '../../components/Layout';
import { useTranslation } from 'react-i18next';

const BlogPost = ({ post }) => {
  const { t } = useTranslation();

  if (!post) {
    return <p>{t('no-posts-found')}</p>;
  }

  return (
    <Layout title={post.title}>
      <article className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">
          {new Date(post.date).toLocaleDateString()} | {post.author}
        </p>
        <div className="prose mb-6 whitespace-pre-wrap"> {/* Preserve whitespace */}
          {post.entry}
        </div>
        <div className="flex flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map(post => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogPosts.find(p => p.id === params.id);
  return { props: { post } };
};

export default BlogPost;
