"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema, { ProductType } from "./schema";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit, setValue } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setImage(file);
    // 이미지를 올렸는 지 확인
    // 이미지 사이즈가 너무 큰지 않은 지 확인 3~4mb 정도 적당
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "photo",
        `https://imagedelivery.net/z10pG-0sSQD0rywWRxERiA/${id}`
      );
    }
  };
  const onSubmit = handleSubmit(async (data: ProductType) => {
    // 이미지를 업로드하고
    const file = image;
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      //무언가 잘못되었을 때 끝내준다.
      // 좀 더 다른방법 있는지?
      return;
    }
    // 이미지 url을 photo 값으로 변경
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    // uploadProduct 함수를 호출
    return uploadProduct(formData);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          )}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
          accept="image/*"
        />
        <FormInput
          required
          placeholder="제목"
          type="text"
          {...register("title")}
        />
        <FormInput
          required
          placeholder="가격"
          type="number"
          {...register("price")}
        />
        <FormInput
          required
          placeholder="자세한 설명"
          type="text"
          {...register("description")}
        />
        <FormBtn text="작성 완료" />
      </form>
    </div>
  );
}
