"use client"

import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import { SpinnerMini } from "@/ui/Spinner";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";


const schema = yup
    .object({
        title: yup
            .string()
            .min(4, "حداقل ۵ کاراکتر را وارد کنید")
            .required("عنوان ضروری است"),
        briefText: yup
            .string()
            .min(10, "حداقل ۱۰ کاراکتر را وارد کنید")
            .required("توضیحات ضروری است"),
        text: yup
            .string()
            .min(10, "حداقل ۱۰ کاراکتر را وارد کنید")
            .required("توضیحات ضروری است"),
        slug: yup.string().required("اسلاگ ضروری است"),
        readingTime: yup
            .number()
            .positive()
            .integer()
            .required("زمان مطالعه ضروری است")
            .typeError("یک عدد را وارد کنید"),
        category: yup.string().required("دسته بندی ضروری است"),
    })
    .required();

function CreatePostForm({ postToEdit = {} }) {
    const { _id: editId } = postToEdit;
    const isEditSession = Boolean(editId)
    console.log(postToEdit)
    const {
        title,
        briefText,
        slug,
        readingTime,
        text,
        category,
        coverImage,
        coverImageUrl: prevCoverImageUrl,
    } = postToEdit;

    let editValues = {}
    if (isEditSession) {
        editValues = {
            title,
            briefText,
            slug,
            readingTime,
            text,
            category: category._id,
            coverImage,
        }
    };
    const router = useRouter();
    const { creatPost, isCreating } = useCreatePost();
    const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl||null);
    const { categories } = useCategories();
    const { editPost, isEditing } = useEditPost();
    const { register, formState: { errors }, handleSubmit, control, setValue } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues: editValues,
    });

    useEffect(()=>{
        if(prevCoverImageUrl){
           async function fetchMyApi() {
            const file =  await imageUrlToFile(prevCoverImageUrl);
               setValue("coverImage",file)
            }
            fetchMyApi();
        }
    },[editId]);

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key])
        }
        
        if (isEditSession) {
            editPost(
                {id:editId , data:formData},

                {onSuccess:()=>{
                    router.push("/profile/posts")
                }
            })
        }else {
            creatPost(formData, {
                onSuccess: () => {
                    router.push("/profile/posts")
                }
            });
        }
    }
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <RHFTextField
                label="عنوان"
                name="title"
                register={register}
                isRequired
                errors={errors}
            />
            <RHFTextField
                label="متن کوتاه"
                name="briefText"
                register={register}
                isRequired
                errors={errors}
            />
            <RHFTextField
                label="متن"
                name="text"
                register={register}
                isRequired
                errors={errors}
            />
            <RHFTextField
                label="اسلاگ"
                name="slug"
                register={register}
                isRequired
                errors={errors}
            />
            <RHFTextField
                label="زمان مطالعه"
                name="readingTime"
                register={register}
                isRequired
                errors={errors}
            />
            <RHFSelect
                name="category"
                label="دسته بندی"
                register={register}
                isRequired
                options={categories}
                errors={errors}
            />

            <Controller
                control={control}
                name="coverImage"
                rules={{ require: "کاور پست الزامی است" }}
                render={({ field: { onChange, value, ...rest } }) => {
                    return (
                        <TextField
                            label="کاور پست"
                            errors={errors}
                            type="file"
                            name="coverImage"
                            {...rest}
                            value={value?.fileName}
                            onChange={(event) => {

                                const file = event.target.files[0];
                                onChange(file);
                                setCoverImageUrl(URL.createObjectURL(file));

                                //اجازه انتخاب عکس تکراری
                                event.target.value = null;
                            }}
                        />
                    );
                }}
            />
            {
                coverImageUrl && (<div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                        fill
                        src={coverImageUrl}
                        alt="cover-image" className="object-cover object-center" />
                    <ButtonIcon
                        onClick={() => {
                            setCoverImageUrl(null)
                            setValue("coverImage", null)
                        }
                        }
                        variant="red"
                        className="w-6 h-6 absolute left-0"
                    >
                        <XMarkIcon />
                    </ButtonIcon>
                </div>)
            }

            <div>
                {
                    isCreating ? <SpinnerMini /> : <Button variant="primary" type="submit" className="w-full">
                        تایید
                    </Button>
                }
            </div>
        </form>
    )
}

export default CreatePostForm;
