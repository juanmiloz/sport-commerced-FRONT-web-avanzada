import '../App.css';
import React, {useEffect, useState} from "react";
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";
import {CRUDService, PRODUCT_REVIEWS, PRODUCTS, REVIEWS} from "../config/axios.ts";
import SimilarProductCard from "../components/SimilarProductsCard.tsx";
import {insertProduct} from "../features/shoppingCar/shoppingCarSlice.ts";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ReviewFormInterface, ReviewInterface} from "../interfaces/Review/review.interfaces.ts";
import Comment from "../components/Comment.tsx";
import useJwtHook from "../hooks/jwt.hook.ts";
import {JwtPayload} from "../interfaces/Auth/auth.interfaces.ts";

const ProductView = () => {

    const [product, setProduct] = useState<ProductInterfaces>();
    const [reviews, setReviews] = useState<ReviewInterface[]>();
    const [comment, setComment] = useState<string>();
    const [similarProducts, setSimilarProducts] = useState<ProductInterfaces[]>()
    const [isChange, setIsChange] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {id} = useParams();
    const {decryptJwt} = useJwtHook()

    useEffect(() => {
        getProduct()
        getProducts()
    }, [isChange]);

    const getProduct = () => {
        if (id !== undefined) {
            CRUDService.getOne(PRODUCTS, id).then((product) => {
                setProduct(product)
                getReviews()
            })
        }
    }

    const getReviews = () => {
        if (id !== undefined) {
            CRUDService.getAllOf(PRODUCT_REVIEWS, id).then((reviewsList) => {
                setReviews(reviewsList)
            })
        }
    }

    const getProducts = () => {
        CRUDService.getAll(PRODUCTS).then((productsList) => {
            setSimilarProducts(productsList.sort(() => Math.random() - 0.5).slice(0, 7))
        });
    }

    const loadProduct = async (product: ProductInterfaces) => {
        navigate('../product-view/' + product.product_id)
        setIsChange(!isChange)
    }

    if (!product) return (<div>No hay producto</div>)

    const onAddToCart = (product: ProductInterfaces) => {
        dispatch(insertProduct(product))
        Swal.fire({
            icon: "success",
            title: "Tu producto ha sido añadido al carrito!",
            showConfirmButton: false,
            timer: 1000
        });
    }

    const renderComments = () => {
        return (!reviews || reviews.length === 0) ?
            "No hay comentarios de este producto"
            :
            reviews.map((review, index) => (
                <Comment review={review} key={index}/>
            ))
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(e.target.value)
    }

    const handleSubmitReview = () => {
        if (comment && comment !== "") {
            const currentDate = new Date()
            Swal.fire({
                title: "Rate",
                input: "range",
                inputLabel: "insert your rate",
                inputAttributes: {
                    min: "0",
                    max: "5",
                    step: "0.1"
                },
                showCancelButton: true,
                confirmButtonText: "Publicar",
                showLoaderOnConfirm: true,
                preConfirm: async (rate) => {
                    try {
                        const review = await buildReview(currentDate, comment, rate)
                        console.log(review)
                        if (review) {
                            return await CRUDService.post(REVIEWS, review)
                        }else{
                            Swal.showValidationMessage('Porfavor loguearse para publicar');
                        }
                    } catch (error) {
                        Swal.showValidationMessage(`Fallo en la solicitud: ${error}`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Comentario publicado exitosamente',
                    });
                }
            });
        }
    }

    const buildReview = async (date: Date, commentValue: string, starValue: number) => {
        const payload: JwtPayload | null = await decryptJwt()
        if (payload !== null) {
            const review: ReviewFormInterface = {
                user_id: parseFloat(payload.user_id),
                product_id: product.product_id,
                comment: commentValue,
                stars: +starValue,
                review_date: date,
            }
            return review
        }
    }


    return (
        <div className="flex flex-col p-6 bg-white shadow-md min-h-[calc(100vh-4rem)]">
            <div className="flex">
                <div className="w-1/2">
                    <img src={product.image_url} className="w-full h-auto rounded-lg" alt={product.name}/>
                </div>
                <div className="w-1/2 ml-6">
                    <h1 className="text-3xl font-semibold mb-4 text-app-700">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="text-2xl font-bold mb-4  text-app-700">{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</div>

                    <p className="text-sm text-gray-500 mb-2">{product.subtitle}</p>
                    <div className="star-rating">
                        <span className="star">&#9733;</span>
                        <span className="rating">{product.calification}</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="mt-1">
                <h2 className="text-lg font-semibold mb-2 text-app-700">Productos Similares</h2>
                <div className="similar-products-carousel flex overflow-x-auto justify-center">
                    {similarProducts && similarProducts.map((similarProduct: ProductInterfaces, index) => (
                        <SimilarProductCard product={similarProduct} loadProduct={loadProduct} key={index}/>
                    ))}
                </div>
            </div>
            <div className="divider"></div>
            <div>
                {renderComments()}
            </div>
            <div className="divider"></div>
            <div>
                <div className={'font-extrabold text-xl'}>Agregar comentario</div>
                <textarea className="my-4 textarea textarea-bordered w-full" placeholder="Review"
                          onChange={handleChange}></textarea>
                <div className={'flex justify-end'}>
                    <button className="btn btn-primary" onClick={handleSubmitReview}>Publicar comentario</button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
