import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {CardElement, useStripe, useElements, Elements} from "@stripe/react-stripe-js"

const PaymentForm = ({orderId: string}) => {
    const stripe = useStripe()
    const elements = useElements()


    const stripePromise  = loadStripe("pk_test_51T2PNKHfkka1xRXrmImaDeW19XjTaZZIH4w81zHJmZJz6VqfTqxSwVw1uxxfTmtBULatvAldV2qdOMKKyDn0llxn00xCT6Sqwk")   //its from the stripe account we get publishkey 
  return (
    <Elements stripe={stripePromise}>
    <form>
      <CardElement/>

    </form>
    </Elements>
  )
}

export default PaymentForm