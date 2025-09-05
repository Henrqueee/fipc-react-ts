import React from "react";
import { Text, Heading } from "../UI/Typography";
import styles from "./Card.module.css";

interface CardProps {
  icon?: string;
  title?: string;
  description?: string;
  animated?: boolean;
  animationDelay?: number;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  animated = false,
  animationDelay = 0,
  className = "",
  children,
}) => {
  const cardClasses = [
    styles.card,
    animated ? styles.cardAnimate : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardStyle =
    animated && animationDelay > 0
      ? { animationDelay: `${animationDelay}s` }
      : {};

  return (
    <div className={cardClasses} style={cardStyle}>
      {icon && (
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{icon}</span>
        </div>
      )}
      {title && (
        <Heading variant="medium" level={3} className={styles.title}>
          {title}
        </Heading>
      )}
      {description && <Text className={styles.description}>{description}</Text>}
      {children}
    </div>
  );
};

export default Card;
