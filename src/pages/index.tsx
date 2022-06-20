import { GetServerSideProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "src/components/SubscribeButton";
import { stripe } from "src/services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
    product: {
        priceId: string;
        amount: number;
    };
}

export default function Home({ product }: HomeProps) {
    return (
        <>
            <Head>
                <title>Início | ig.news</title>
            </Head>

            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Ola, Bem-vindo(a)</span>

                    <h1>
                        {" "}
                        Novidades sobre o mundo <span>React</span>{" "}
                    </h1>
                    <p>
                        Tenha acesso a todas as publicações <br />
                        <span>por {product.amount}/mes</span>
                    </p>
                    <SubscribeButton priceID={product.priceId} />
                </section>

                <img src="/images/avatar.svg" alt="mulher programando" />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const price = await stripe.prices.retrieve(
        "price_1LChs0FWz9UTAP6lu5lmEhi0");

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price.unit_amount / 100),
    };

    return {
        props: {
            product,
        },
    };
};
