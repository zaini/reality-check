/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { type Fact } from '~/utils'

type IOptionProps = {
    fact: Fact
    handleSelectOption: () => void
}

const Option = ({ fact, handleSelectOption }: IOptionProps) => {
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNSLASH_KEY as string}&query=${fact.imageTag}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.statusText);
                }
            })
            .then((data) => {
                setImageUrl(data.results[Math.floor(Math.random() * 10)].urls.regular as string)
            })
            .catch((error) => {
                console.error('Failed to fetch images:', error);
            });
    }, [fact.imageTag])

    return (
        <div className="flex flex-col justify-center items-center w-[100%] cursor-pointer" onClick={handleSelectOption}>
            {imageUrl && <div className="w-[100%] h-[100vh] relative">
                <Image fill src={imageUrl} alt={fact.imageTag} />
            </div>}
            <div className="absolute text-center">
                <p className="text-4xl font-bold text-white bg-black bg-opacity-50 border-2 border-white rounded px-4 py-1">
                    {fact.text}
                </p>
            </div>
        </div>
    )
}

export default Option