import React from 'react';
import {ReviewInterface} from "../interfaces/Review/review.interfaces.ts";


interface Props {
    review: ReviewInterface;
}

const Comment: React.FC<Props> = ({review}) => {

    const getDateString = () => {
        const date = new Date(review.review_date)
        return date.toDateString()
    }

    const renderStarts = (qualification: number) => {
        const stars: React.ReactNode[] = [];

        for (let i = 0; i < qualification; i++) {
            stars.push(<span key={i}>&#9733;</span>);
        }

        return stars;
    }


    return (
        <div className={'card bg-base-100 shadow-md p-2 m-5'}>
            <div className={' flex justify-between'}>
                <div className={'flex gap-3 items-center justify-center'}>
                    <span className={'font-bold'}>{review.user.username.charAt(0).toUpperCase() + review.user.username.slice(1).toLowerCase()}</span>
                    <div className={'text-[#f1c40f]'}>
                        {renderStarts(review.stars)}
                        <span className={'ml-1'}>{review.stars}</span>
                    </div>
                </div>
                <div>
                    {getDateString()}
                </div>
            </div>

            {review.comment}
        </div>
    );
};

export default Comment;
