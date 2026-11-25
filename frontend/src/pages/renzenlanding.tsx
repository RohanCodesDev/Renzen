import Head from 'next/head';
import { RenzenLanding } from '@/components';

export default function RenzenLandingPage() {
  return (
    <>
      <Head>
        <title>Renzen — Single-Estate Teas, Specialty Coffees & Ceremonial Matcha</title>
        <meta
          name="description"
          content="Artisanal single-estate teas, specialty single-origin coffees, and ceremonial Uji matcha. An atelier of The House of Paramanna."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RenzenLanding />
    </>
  );
}
