import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "src/services/prismic";

import styles from '../post.module.scss'

interface PostPreviewProps{
    post:{
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function postPreview({post}: PostPreviewProps) {

    const {data: session, status}  = useSession()
    
    useEffect(() => {
        if (session?.activeSubscription){
            Router.push(`/posts/${post.slug}`)
        }
    },[session])

    return(
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                    className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{__html: post.content}}/>

                    <div className={styles.continueReading}>
                        Deseja continuar lendo?
                        <Link href="/">
                            <a> Inscreva-se agora!</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>

    );
}

export const getStaticPaths = () => {
    return{
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const {slug} = params


    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: "numeric"
        })
    };

    return {
        props:{
            post
        },
        redirect: 60*30, //30 minutes
    }
};
