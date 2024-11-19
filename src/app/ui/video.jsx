import styles from "./video.module.css";

export function Video() {
  return (
    <video
      className={styles.video}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/video/pushup-man.mp4" type="video/mp4" />
      Din browser understøtter ikke video-tag'et.
    </video>
  );
}
