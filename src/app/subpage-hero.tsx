import Image from "next/image";
import styles from "./subpage-hero.module.css";

type SubpageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  standalone?: boolean;
};

export default function SubpageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  standalone = false,
}: SubpageHeroProps) {
  return (
    <section className={`${styles.hero} ${standalone ? styles.standalone : ""}`}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.artwork}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 700px) calc(100vw - 52px), (max-width: 1200px) 42vw, 500px"
        />
      </div>
    </section>
  );
}
