import { Redirect, useParams } from 'react-router-dom';

import Data from 'src/data';
import './style.scss';

const Article = () => {
  const { slug } = useParams();
  const article = Data.find((item) => item.slug === slug);

  if (!article) {
    return <Redirect to="/error" />;
  }
  return (
    <div className="article">
      <img src={article.img} alt={article.legende} className="article-img" />
      <h1 className="article-title">
        {article.title}
      </h1>
      <p className="article-intro">
        {article.intro}
      </p>
      <p className="article-text">
        {article.text}
      </p>
    </div>
  );
};

export default Article;
