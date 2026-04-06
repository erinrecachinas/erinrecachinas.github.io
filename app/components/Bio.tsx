import styles from "./Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.bio}>
      <h1 className="name" style={{ fontFamily: "var(--font-arvo)" }}>
        Erin Recachinas
      </h1>
      <p style={{ fontFamily: "var(--font-nunito)" }}>
        I&apos;m Erin, an Engineering Manager leading Controls
        at <a href="https://cash.app/" target="_blank" rel="noopener noreferrer">CashApp</a>
      </p>
      <p style={{ fontFamily: "var(--font-nunito)" }}>
        My favorite things include Yoga, Cooking &amp; Baking, Star
        Trek, <span className={styles.nowrap}>Mini Coopers</span>,
        my husband <a href="https://mike.recachinas.dev" target="_blank" rel="noopener noreferrer">Mike</a>,
        my kids,
        and <a href="https://www.instagram.com/jalapenopoppy" target="_blank" rel="noopener noreferrer">my dog, Poppy</a>
      </p>
    </div>
  );
}
