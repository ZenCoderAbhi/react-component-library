import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import "./ImageStyles.css"
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { useState } from "react";

interface ImageItem {
    imageId: number;
    imageUrl: string;
    [key: string]: unknown;
}

export interface ImageProps {
    images: ImageItem[];
}



export default function Image({ images }: ImageProps) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function handleImageButtonClick(value: string) {
       
        if(value === "left") {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }

        if(value === "right") {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }

    }

    return (
        <div className="image-container rounded-border8px box-shadow">
            {/* {images.map((image, index) => (
                
            ))} */}
            <img key={images[currentImageIndex].imageId} src={images[currentImageIndex].imageUrl} alt={`image-${currentImageIndex}`} className="image-item" />
            <div className="image-left-right-button">
                {currentImageIndex > 0 && (
                    <div className="image-left-button">
                        <Button onClick={() => handleImageButtonClick("left")} variant="primary" size="small" icon={<FontAwesomeIcon icon={faCaretLeft} size="xl" style={{color: "rgb(255, 255, 255)",}} />}/>
                    </div>
                    
                )}
                {currentImageIndex < images.length - 1 && (
                    <div className="image-right-button">
                        <Button onClick={() => handleImageButtonClick("right")} variant="primary" size="small" icon={<FontAwesomeIcon icon={faCaretRight} size="xl" style={{color: "rgb(255, 255, 255)",}} />}/>
                    </div>
                )}
            </div>
        </div>
    )
}