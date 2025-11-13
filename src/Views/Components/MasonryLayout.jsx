import React from "react"

export const MasonryLayout = ({ children }) => {
    return (
        <div
            className="
                columns-1
                md:columns-2
                lg:columns-3
                xl:columns-4
                gap-4
                [column-fill:_balance]
            "
        >
            {React.Children.map(children, (child, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                    {child}
                </div>
            ))}
        </div>
    )
}