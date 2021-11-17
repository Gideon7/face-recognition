import React from "react";


export const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                <img alt= '' src={imageUrl} width='500px' height='auto'/>
            </div>
        </div>
    )
}