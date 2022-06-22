import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "src/services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method === "POST"){
        const session = await getSession({req})

        const stripeCustomer = await stripe.customers.create({
            email:session.user.email
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], //metodo de pagamento
            billing_address_collection: 'required', //endereço obrigatorio
            line_items:[
                 {price: 'price_1LChs0FWz9UTAP6lu5lmEhi0', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })


        return res.status(200).json({sessionId: stripeCheckoutSession.id });
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}