import { signIn, useSession,  } from 'next-auth/react';
import styles from './styles.module.scss'

interface ISubscriptionButtonProps{
    priceID: string;
}

export function SubscribeButton({priceID}: ISubscriptionButtonProps){
    const { data: session, status } = useSession();

    function handleSubscribe(){
        if (!session){
            signIn('github')
            return;
        }


    }

    return(
        <button 
        type='button'
        className={styles.subscribeButton}
        onClick={() => handleSubscribe()}
        >
            Inscreva-se agora
        </button>
    );
}