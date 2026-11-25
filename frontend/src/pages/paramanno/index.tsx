import Head from 'next/head';
import { ParamannaHome } from '@/components';

export default function ParamannoIndexPage() {
  return (
    <>
      <Head>
        <title>Paramanna Organics — Sacred Vedic Harvest &amp; Pure Provisions</title>
        <meta
          name="description"
          content="Paramanna Organic Foods — Vedic A2 Gir Cow Bilona Ghee, Wild Raw Forest Honey, and Artisanal Superfoods. The House of Paramanna."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParamannaHome />
    </>
  );
}
