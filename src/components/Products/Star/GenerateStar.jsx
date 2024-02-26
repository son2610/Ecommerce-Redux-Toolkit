import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";

import React from "react";

const GenerateStar = ({ star }) => {
    let originStar = Math.floor(star);
    let half = Number(Math.round(star - originStar));
    let noStar = Number(5 - originStar - half);

    return (
        <>
            {new Array(originStar).fill(1).map((item, index) => (
                <FaStar color="orange" key={index} />
            ))}
            {Boolean(half) && <FaStarHalf color="orange" />}
            {Boolean(noStar) &&
                new Array(noStar)
                    .fill(1)
                    .map((item, index) => (
                        <FaRegStar color="orange" key={index} />
                    ))}
        </>
    );
};

export default GenerateStar;
