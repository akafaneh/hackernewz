import React, { HTMLAttributeAnchorTarget, ReactNode } from "react";
import styles from "./buttons.module.scss";
export type ButtonLinkProps = {
  children: ReactNode;
  url: string;
  target?: HTMLAttributeAnchorTarget;
};
export const ButtonLink = ({ children, target, url }: ButtonLinkProps) => {
  return (
    <a href={url} target={target} className={styles.button}>
      {children}
    </a>
  );
};
