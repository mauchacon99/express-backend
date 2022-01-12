const stripe = require('stripe')(process.env.STRIPE_SK)

const paymentMethod = async (token) => {
    return await stripe.paymentMethods.create({
        type: 'card',
        card: {token}
    })
}

const generateIntent = async (amount, description, paymentMethod) => {
    return await stripe.paymentIntents.create({
        amount: parseFloat(amount) * 100,
        currency: process.env.STRIPE_CURRENCY,
        payment_method_types: ['card'],
        payment_method: paymentMethod,
        description
    })
}

exports.paymentIntent = async (token, amount, description) => {
    const method = await paymentMethod(token)
    return await generateIntent(amount, description, method.id)
}

exports.checkPayment = async (id) => {
    const detailPayment = await stripe.paymentIntents.retrieve(id)
    const status = detailPayment.status.includes('succe') ? 'success' : 'fail'
    return {status, detailPayment}
}

exports.createCustomer = (token, email) => {
    return new Promise((resolve, reject) => {
        stripe.customers
            .create({
                source: token,
                email
            })
            .then(
                (response) => {
                    resolve(response)
                },
                (err) => {
                    reject(err)
                }
            )
    })
}

exports.createSubscription = async (customer, price ) => {
    return new Promise((resolve, reject) => {
        stripe.subscriptions
            .create({
                customer,
                items: [{
                    price
                }],
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
            })
            .then(
                (response) => {
                    resolve(response)
                },
                (err) => {
                    reject(err)
                }
            );
    })
}
