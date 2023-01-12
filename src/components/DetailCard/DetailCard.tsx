import Styles from './DetailCard.module.css';

type TProps = {
  heading: string;
  text: string;
  image?: string;
};

export default function DetailCard ({heading, text, image}: TProps) {
  return (
    <div className={Styles.card}>
      <h3 className={Styles.heading}>{heading}</h3>
      {image && (
        <div className={Styles.image} style={{backgroundImage: `url(${image})`}}></div>
      )}
      <p className={Styles.text}>{text}</p>
    </div>
  )
}