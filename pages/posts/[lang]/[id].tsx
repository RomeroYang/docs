/* eslint-disable react/no-children-prop */
import { memo, useMemo } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import content from '../../../public/content.json';
import styles from '../../../styles/posts.module.css';

// eslint-disable-next-line react/display-name
const Post = memo(() => {
  const router = useRouter();
  const name = router.query.id as string;
  const lang = router.query.lang as string;

  const post = useMemo(() => {
    if (!name || !lang) return undefined;

    const temp = content.find(i => i.file == name)?.content;

    return (temp as Record<string, string>)[lang];
  }, [name, lang]);

  if (!post) return null;

  return (
    <div className={styles.post}>
      <ReactMarkdown children={post} />
    </div>
  );
})

export default Post;