import React from "react";
import styles from "./cards.module.scss";
import DummyImage from "../../../public/placeholder.jpg";
import Image from "next/image";
import ButtonLink from "../buttons/button-link";
import clsx from "clsx";

export type StoryCardProps = {
  title: string;
  score: number;
  url: string;
  timestamp: number;
  authorId: string;
  authorKarmaScore: number;
  className?: string;
};
const StoryCard = ({ className, timestamp, title, authorId, authorKarmaScore, score, url }: StoryCardProps) => {
  return (
    <div className={clsx(styles.card, className)}>
      <Image src={DummyImage} alt="Dummy pic" className={styles.img} />
      <div className={styles.body}>
        <h5 className={styles.title}>{title}</h5>
        {url && (
          <ButtonLink url={url} target="_blank">
            Read more
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
