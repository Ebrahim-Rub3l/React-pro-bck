import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";


const ImageUploader = ({ images, onChange ,setUpImages}) => {
    const inputRef = useRef(null);

    const handleFiles = (fileList) => {
        const files = Array.from(fileList).slice(0, 5 - images.length);

        const newImages = files.map((file) => ({
            file: file,
            preview: URL.createObjectURL(file),
        }));

        onChange([...images, ...newImages].slice(0, 5));
    };

    const handleImageUpload = (e) => {
        handleFiles(e.target.files);
        setUpImages(e.target.files)
    };

    const handleRemoveImage = (i) => {
        const arr = [...images];
        arr.splice(i, 1);
        onChange(arr);
    };

    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">

                {images.map((img, i) => (
                    <div
                        key={i}
                        className="relative aspect-square rounded overflow-hidden border border-ink/10 group"
                    >
                        <img
                            src={
                                img.preview
                                    ? img.preview
                                    : `http://localhost:5000/${img.URL}`
                            }
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        <button
                            type="button"
                            className="bg-red-500 p-1 absolute top-1 right-1 font-bold text-xs text-white rounded-lg"
                            onClick={() => handleRemoveImage(i)}
                        >
                            <IoMdClose />

                        </button>
                    </div>
                ))}

                {images.length < 5 && (
                    <button
                        type="button"
                        onClick={() => inputRef.current.click()}
                        className="aspect-square rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center text-ink/40 hover:text-green-500 transition-colors cursor-pointer border-ink/10"
                    >
                        +
                    </button>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageUploader;