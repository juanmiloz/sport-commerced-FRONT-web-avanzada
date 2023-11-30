import InjectedCheckoutForm from "../components/CheckoutForm.tsx";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useStripe} from "@stripe/react-stripe-js";
import SummaryCard from "../components/SummaryCard.tsx";
import Swal from "sweetalert2";
import {clearShoppingCar} from "../features/shoppingCar/shoppingCarSlice.ts";
import {useDispatch, useSelector} from "react-redux";


export const CheckoutMiddleware = () => {
        return (
            <Navigate to={"/sport-commerce/checkout/finish/"}/>
        )
    }
;

export const CheckoutView = () => {
    const stripe = useStripe();
    const dispatch = useDispatch()
    const {products} = useSelector((state: any) => state.shoppingCarState.value)
    const navigate = useNavigate()

    if (products.length === 0)
        navigate("/sport-commerce/home")


    useEffect(() => {
        if (!stripe) {
            console.log("Stripe.js hasn't loaded yet.");
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            console.log("Invalid or missing payment_intent_client_secret in URL.");
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Payment succeeded!",
                    });

                    setTimeout(() => {
                        dispatch(clearShoppingCar())

                    }, 3000)
                    break;
                case "processing":
                    Swal.fire({
                        icon: "info",
                        title: "Info",
                        text: "Your payment is processing.",
                    });
                    break;
                case "requires_payment_method":
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Your payment was not successful, please try again.",
                    });
                    break;
                default:
                    break;
            }
        });
    }, [stripe]);


    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50">

            <div className="flex-col lg:flex-row p-10">
                <div>
                    <h1 className="text-5xl text-app-700 font-bold pb-10">Verificar!</h1>
                </div>
                <div className={"grid grid-cols-3 gap-4"}>
                    <div className={"col-span-2"}>
                        <SummaryCard/>
                    </div>
                    <div className="card shrink-0 w-full h-fit shadow-lg p-5 bg-white">
                        <InjectedCheckoutForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutView;