import Head from "next/head";
import { SubscribeButton } from "src/components/SubscribeButton";

import styles from './home.module.scss'

export default function Home() {
    return (
        <>
            <Head>
                <title>Início | ig.news</title>
            </Head>

            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>
                    👏 Ola, Bem-vindo(a)
                    </span>

                    <h1> Novidades sobre o mundo <span>React</span> </h1>
                    <p>
                       Tenha acesso a todas as publicações  <br />
                       <span>
                         por R$9,90/mes
                       </span>
                    </p>
                    <SubscribeButton/>
                </section>

                <img src="/images/avatar.svg" alt="mulher programando" />
            </main>

        </>
    );
}
