import CardArticle from 'src/components/Articles/CardArticle';
import data from 'src/data';

const Articles = () => (
  <div className="articles">
    {data.map((article) => (
      <CardArticle
        key={article.id}
        {...article}
      />
    ))}
  </div>
);

export default Articles;
