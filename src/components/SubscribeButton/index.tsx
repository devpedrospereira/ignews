import styles from './styles.module.scss'

interface ISubscriptionButtonProps{
    priceID: string;
}

export function SubscribeButton({priceID}: ISubscriptionButtonProps){
    return(
        <button 
        type='button'
        className={styles.subscribeButton}>
            Inscreva-se agora
        </button>
    );
}