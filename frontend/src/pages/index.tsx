import { useState, useEffect } from 'react';
import Head from 'next/head';
import MirrorBackground from '@/components/ui/MirrorBackground';
import styles from '@/styles/Landing.module.css';

export default function LandingPage() {
  const line1Full = "Welcome to";
  const line2Full = "The House Of";
  const line3Full = "Paramanna";

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [step, setStep] = useState(0); // 0: initial delay, 1: typing line 1, 2: typing line 2, 3: typing line 3, 4: done

  useEffect(() => {
    // Initial pause before typing begins
    const timer = setTimeout(() => {
      setStep(1);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Step 1: Type "Welcome to"
  useEffect(() => {
    if (step !== 1) return;

    if (line1.length < line1Full.length) {
      const timeout = setTimeout(() => {
        setLine1(line1Full.slice(0, line1.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      // Pause before moving to line 2
      const pause = setTimeout(() => {
        setStep(2);
      }, 250);
      return () => clearTimeout(pause);
    }
  }, [step, line1]);

  // Step 2: Type "The House Of"
  useEffect(() => {
    if (step !== 2) return;

    if (line2.length < line2Full.length) {
      const timeout = setTimeout(() => {
        setLine2(line2Full.slice(0, line2.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      // Pause before moving to line 3
      const pause = setTimeout(() => {
        setStep(3);
      }, 200);
      return () => clearTimeout(pause);
    }
  }, [step, line2]);

  // Step 3: Type "Paramanna"
  useEffect(() => {
    if (step !== 3) return;

    if (line3.length < line3Full.length) {
      const timeout = setTimeout(() => {
        setLine3(line3Full.slice(0, line3.length + 1));
      }, 75);
      return () => clearTimeout(timeout);
    } else {
      setStep(4);
    }
  }, [step, line3]);

  return (
    <>
      <Head>
        <title>The House Of Paramanna</title>
        <meta name="description" content="Welcome to The House Of Paramanna." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.landingContainer}>
        {/* Alternating mirrored background: [ Original | Flipped Horizontally | Original | ... ] */}
        <MirrorBackground
          src="/landingbg.jpg"
          tileSize={320}
          opacity={0.18}
          mixBlendMode="multiply"
          mode="horizontal"
        />

        <div className={styles.centerContent}>
          {/* Line 1: Welcome to */}
          <p className={styles.welcomeText}>
            <span>{line1}</span>
            {step === 1 && <span className={styles.cursorSmall} />}
          </p>

          {/* Line 2: The House Of (Medium) & Line 3: Paramanna (Larger) */}
          <h1 className={styles.mainTitle}>
            <div className={styles.titleLineMedium}>
              <span>{line2}</span>
              {step === 2 && <span className={styles.cursorMedium} />}
            </div>
            <div className={styles.titleLineLarge}>
              <span>{line3}</span>
              {step >= 3 && <span className={styles.cursorLarge} />}
            </div>
          </h1>
        </div>

        {/* Half-appeared Sacred Mandala at bottom */}
        <div className={styles.mandalaWrapper} aria-hidden="true">
          <img
            src="/mandalasvg.svg"
            alt=""
            className={styles.mandalaImage}
          />
        </div>
      </main>
    </>
  );
}
