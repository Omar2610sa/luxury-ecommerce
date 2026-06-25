'use client'
import React from 'react'
import { cn } from '@/lib/utils'



const ColorSelector = ({ details , onChange  }: Props) => {
    const [selectedDetailId, setSelectedDetailId] = React.useState(details[0]?.id)

    const handleSelect = (detail: Detail) => {
        setSelectedDetailId(detail.id)
        onChange?.(detail)
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {details.map((detail) => (
                <button
                    key={detail.id}
                    onClick={() => handleSelect(detail)}
                    title={detail.color.title}
                    style={{
                        backgroundColor: detail.color.hex,
                        borderColor: selectedDetailId === detail.id ? detail.color.hex : 'gray',
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