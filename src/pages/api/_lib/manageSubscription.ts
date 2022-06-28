import { query as q } from "faunadb";
import { fauna } from "src/services/faunadb";
import { stripe } from "src/services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,

) {
    const userRef = await fauna.query(
        q.Select(
            // seleciona apenas os campos desejados, onde a gente coloca no primeiro parametro
            "ref",
            q.Get(
                // Get = busca / selec
                q.Match(
                    //Get + Match = busca o item que [parametro 1] é igual ao [parametro 2]
                    q.Index("user_by_stripe_customer_id"), //[parametro 1]
                    customerId //[parametro 2]
                )
            )
        )
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId); //busca  todos os dados da subscription

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }
  
    if (createAction){
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                {data: subscriptionData}
    
            )
        )
    } else{
        await fauna.query(
            q.Replace(
                q.Select(
                    'ref',
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscriptionId,
                        )
                    )
                ),
                {data: subscriptionData}
            )
        
        )
    }

}
