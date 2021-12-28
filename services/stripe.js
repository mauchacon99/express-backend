const stripe = require('stripe')(process.env.STRIPE_SK)

const paymentMethod = async (token) => {
    return await stripe.paymentMethods.create({
        type: 'card',
        card: { token }
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
    return { status, detailPayment }
}
