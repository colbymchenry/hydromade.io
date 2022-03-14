import Stripe from "stripe"

export const StripeAdmin = new Stripe(process.env.STRIPE_SECRET);

export async function CreateStripeAccount(userEmail) {
    return await StripeAdmin.accounts.create({
        type: "express",
        business_type: "individual",
        business_profile: {
            mcc: 1520,
            name: `Hydromade for ${userEmail}`,
            product_description: "General Services",
            url: "https://hydromade.io"
        },
        settings: {
            card_payments: {
                statement_descriptor_prefix: "Hydromade"
            },
            payments: {
                statement_descriptor: "Hydromade"
            },
            payouts: {
                statement_descriptor: "Hydromade"
            }
        }
    });
}

export async function CreateStripeConnectLink(accountId) {
   return (await StripeAdmin.accountLinks.create({
        type: "account_onboarding",
        account: accountId,
        refresh_url: `${process.env.APP_URL}/app/marketplace`,
        return_url: `${process.env.APP_URL}/app/marketplace`,
    })).url;
}

export async function GetStripeAccount(accountId) {
    return await StripeAdmin.accounts.retrieve(accountId);
}