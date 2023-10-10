import Button from "../Button/Button";
import "../PersonCard/PersonCard.css";

function PersonCard({ person }) {
  const formattedDesc = person.short_description.replace(/<\/?p>/g, "");
  const shortDesc =
    formattedDesc?.length >= 150
      ? formattedDesc.slice(0, 150) + "..."
      : formattedDesc;
  return (
    <li className="person__card">
      <img className="person__image" src={person.images[0].src} alt="person" />
      <div className="person__details">
        <p className="person__name">{person.name}</p>
        <p className="person__desc">{shortDesc}</p>
        <ul className="person__category">
          {person.categories?.length > 0 &&
            person.categories.map((category) => {
              return (
                <li key={category.id}>{decodeURIComponent(category.slug)}</li>
              );
            })}
        </ul>
        <span className="person__price">
          {person.prices.price} лв.
        </span>
      </div>
      <Button link='https://greet.bg/?add-to-cart=5589' className="btn" text="Add To Cart" />
    </li>
  );
}

export default PersonCard;
