import {Outlet} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";
import {useEffect, useState} from "react";
import {CHECKOUTS, CRUDService} from "../config/axios.ts";
import {useSelector} from "react-redux";
import {StateSchema as ShoppingCarStateSchema} from "../interfaces/ShoppingCar/shopping-car.interfaces.ts";
import {StateSchema} from "../interfaces/Auth/auth.interfaces.ts";
import {CheckoutInterface} from "../interfaces/Checkout/checkout.interface.ts";

enum PaymentTheme {
    STRIPE = "stripe",
    NIGHT = "night",
    FLAT = "flat"
}

export const CheckoutWrapper = () => {
    const stripePromise = loadStripe("pk_test_51OHb2NAW7xQWIx2NhENfJaHcnE5TI9UoEChMa4099IiqdpMQdfrFXplbftdQVZ7cqEDT2uHEpNAcAvsK5VeMs4WI00JbYgAVYI");

    const [clientSecret, setClientSecret] = useState("");

    const {total} = useSelector((state: ShoppingCarStateSchema) => state.shoppingCarState.value)
    const user = useSelector((state: StateSchema) => state.authState.value)

    if (user === null)
        return (<div>Debes iniciar sesión para poder realizar la compra</div>)

    const newCheckout: CheckoutInterface = {
        total: total,
        user_id: 1,
    }

    useEffect(() => {
        CRUDService.post(CHECKOUTS,newCheckout).then((res) => {
            setClientSecret(res.data.secret)
        });
    }, []);

    const appearance = {
        theme: PaymentTheme.STRIPE,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (<>
            {
                clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <Outlet/>
                    </Elements>
                )
            }
        </>
    )
}