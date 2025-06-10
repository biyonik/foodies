"use client";

import classes from './image-picker.module.css';
import {ChangeEvent, useRef, useState} from "react";
import Image from "next/image";

interface ImagePickerProps {
    label: string;
    name: string;
}

export default function ImagePicker({label, name}: ImagePickerProps) {
    const [pickedImage, setPickedImage] = useState<any>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    function handlePickClick() {
        imageInputRef.current?.click();
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (url) => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {
                        !pickedImage
                            ? <p>No picked image yet!</p>
                            : <Image src={pickedImage} alt="The image selected by the user." fill />
                    }
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg, image/jpg"
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    )
}