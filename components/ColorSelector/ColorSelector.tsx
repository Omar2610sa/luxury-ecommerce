'use client'
import React from 'react'
import { cn } from '@/lib/utils'



const ColorSelector = ({ details }: Props) => {
    const [selectedDetailId, setSelectedDetailId] = React.useState(details[0]?.id)

    return (
        <div className="flex gap-2 flex-wrap">
            {details.map((detail) => (
                <button
                    key={detail.id}
                    onClick={() => setSelectedDetailId(detail.id)}
                    title={detail.color.title}
                    style={{
                        backgroundColor: detail.color.hex,
                        borderColor: selectedDetailId === detail.id ? detail.color.hex : 'transparent',
                    }}
                    className={cn(
                        "size-6 rounded-full border-2 transition-all hover:scale-110",
                        selectedDetailId === detail.id
                            ? "ring-2 ring-offset-2 ring-black scale-110"
                            : "opacity-70"
                    )}
                />
            ))}
        </div>
    )
}

export default ColorSelector