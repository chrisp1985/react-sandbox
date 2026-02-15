export const FilmCard = ({ title, description, image }: { title: string; description: string; image?: string }) => {
  return (
    <div className="film-card"> 
        <h2>{title}</h2>
        <p>{description}</p>
        {image && <img src={image} alt={title} />}
    </div>
  );
}   