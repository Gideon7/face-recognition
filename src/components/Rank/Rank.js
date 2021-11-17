import React from "react";

export const Rank = ({user}) => {
    const {name, entries} = user
    return (
        <div>
            <div className="white f3">
                {`${name}  Your Rank is....`}
            </div>
            <div className="white f1">
                {`${entries}`}
            </div>
        </div>
    )
}