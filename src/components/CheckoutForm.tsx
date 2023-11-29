import {ElementsConsumer, PaymentElement} from '@stripe/react-stripe-js';
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import {StateSchema as ShoppingCarStateSchema} from "../interfaces/ShoppingCar/shopping-car.interfaces.ts";
import {FormEventHandler} from "react";

const CheckoutForm = (props) => {

    const {stripe, elements} = props;
    const {total} = useSelector((state: ShoppingCarStateSchema) => state.shoppingCarState.value)

    const handleSubmit:FormEventHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/sport-commerce/checkout/finish",
            },
        });

        if (result.error) {
            console.log(result.error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.error.message,
            });

        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
            <h2 className={"text-3xl text-center my-3 text-app-700"}>Método de pago</h2>
            <PaymentElement/>

            <div className={"divider"}></div>

            <div className={"flex justify-between text-app-700 font-bold text-xl"}>
                <h4>Total</h4>
                <h4>{new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(total)}</h4>
            </div>


            <button disabled={!stripe} className={"btn btn-primary"}>Pagar</button>
        </form>
    );

}

export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({stripe, elements}) => (
                <CheckoutForm stripe={stripe} elements={elements}/>
            )}
        </ElementsConsumer>
    )
}