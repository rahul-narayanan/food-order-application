import React from "react";

export const SelectType = ({
    options, title, description, onSelect
}) => (
    <>
        <div className="title">
            <h2>{title}</h2>
            <h3>{description}</h3>
        </div>
        <div className="item_section">
            {options.map((_type) => (
                <div
                    key={_type.id || _type.value}
                    className="box"
                    onClick={() => onSelect(_type)}
                >
                    <div className="item animate__animated animate__zoomIn wow">
                        <div className="item_img center_img">
                            <img src={_type.img} className="crop_img" />
                        </div>
                        <div className="text_box">
                            <h2>{_type.name}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);
