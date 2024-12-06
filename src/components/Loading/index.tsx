import React from "react";
import "./loading.css";
const Loading = () => {
    return (
        <div className="loading_cont">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </div>
    );
};

export default Loading;
