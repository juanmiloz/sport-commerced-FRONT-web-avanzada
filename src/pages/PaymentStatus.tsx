import {useEffect} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";

const PaymentStatus = () => {
    const stripe = useStripe();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // Retrieve the "payment_intent_client_secret" query parameter appended to
        // your return_url by Stripe.js
        const {payment_intent_client_secret} = useParams();

        if (!payment_intent_client_secret) {
            return;
        }

        // Retrieve the PaymentIntent
        stripe.retrievePaymentIntent(payment_intent_client_secret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    Swal.fire({
                        icon: "success",
                        title: "Tu pago ha sido realizado con éxito!",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    break;
                case "processing":
                    Swal.fire({
                        icon: "info",
                        title: "Tu pago está siendo procesado",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    break;
                case "requires_payment_method":
                    Swal.fire({
                        icon: "error",
                        title: "Error"
                    });
                    break;
                default:
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Algo salió mal"
                    });
                    break;
            }
        });
    }, [stripe]);


    return (<>Página de pago completo</>);
};

export default PaymentStatus;