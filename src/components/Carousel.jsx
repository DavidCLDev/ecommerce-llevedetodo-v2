import React from "react";
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

export default function Carousel({ children, arrowSize='size-10', arrowPadR='right-2', arrowPadL='left-2', showIndicators=false }) {
    const [slide, setSlide] = useState(0);

    const total = React.Children.count(children);

    function nextSlide() {
        setSlide(slide === total - 1 ? 0 : slide + 1);
    }

    function prevSlide() {
        setSlide(slide === 0 ? total - 1 : slide - 1);
    }

    return (
        <div className="flex justify-center items-center size-full relative">
            <BsArrowLeftCircleFill className={`absolute ${arrowPadL} ${arrowSize} text-white cursor-pointer`} onClick={ prevSlide } />
            {
                React.Children.map(children, (child, index) => {
                    return(
                        <div className={ slide === index ? "block size-full" : "hidden"}>
                            {child}
                        </div>
                    );
                })
            }
            <BsArrowRightCircleFill className={`absolute ${arrowPadR} ${arrowSize} text-white cursor-pointer`} onClick={ nextSlide } />
            {
                showIndicators && (
                    <span className="flex absolute bottom-3">
                        {
                            React.Children.map(children, (_, index) => {
                                const buttonStyles = "size-2.5 mx-1.5 rounded-full cursor-pointer ";
                                return <button key={index} className={ buttonStyles + (slide === index ? 'bg-white' : 'bg-stone-500' ) }></button>
                            })
                        }
                    </span>
                )
            }
        </div>
    );
}