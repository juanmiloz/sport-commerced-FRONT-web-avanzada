import React from "react";

interface Props {
    images: string[]
}

const CarouselOffers: React.FC<Props> = ({images}) => {

    const slidePrev = ( index:number)=>{
        if(index==0){
            return images.length
        }
        else{
            return index-1;
        }
    }

    const slideNext = (index:number) => {
        if(index==images.length){
            return 1
        }else{
            return index+1
        }
    }



    return (
        <div>
            <div className="carousel w-full">
                {images.map((img, index) =>
                    <div id={"slide" + index} key={index} className="carousel-item relative w-full">
                        <img src={img} className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={'#slide'+slidePrev(index)} className="btn btn-circle">❮</a>
                            <a href={'#slide'+slideNext(index)} className="btn btn-circle">❯</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarouselOffers;
