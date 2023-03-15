import React from "react";
import styles from "./cards.module.scss";
import DummyImage from "../../../public/placeholder.jpg";
import Image from "next/image";
import clsx from "clsx";
import dayjs from "dayjs";
import { ButtonLink } from "@/components";

export type StoryCardProps = {
  title: string;
  score: number;
  url: string;
  timestamp: number;
  authorId: string;
  authorKarmaScore: number;
  className?: string;
};
export const StoryCard = ({ className, timestamp, title, authorId, authorKarmaScore, score, url }: StoryCardProps) => {
  return (
    <div className={clsx(styles.card, className)}>
      <Image src={DummyImage} alt="Dummy pic" className={styles.img} />
      <div className={styles.body}>
        <div className={styles.metaData}>
          <div>By: {authorId}</div>
          <div>Karma: {authorKarmaScore}</div>
          <div className={styles.storyInfo}>{dayjs.unix(timestamp).format("HH:mm DD/MMM/YY")}</div>
          <div className={styles.storyInfo}>{score} points</div>
        </div>
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
