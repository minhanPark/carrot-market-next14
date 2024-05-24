"use client";

import {
  EyeIcon as SolidEyeIcon,
  HandThumbUpIcon as SolidHandThumbUpIcon,
} from "@heroicons/react/24/solid";
import {
  EyeIcon as OutlineEyeIcon,
  HandThumbUpIcon as OutlineHandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/posts/[id]/actions";

interface LikeButtonProps {
  isLike: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLike,
  likeCount,
  postId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLike, likeCount },
    (previousState, payload) => ({
      isLike: !previousState.isLike,
      likeCount: previousState.isLike
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const handleClick = async () => {
    reducerFn(undefined);
    if (isLike) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors ${
        state.isLike
          ? "bg-orange-500 text-white border-orange-500"
          : "hover:bg-neutral-800"
      }`}
    >
      {state.isLike ? (
        <SolidHandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLike ? <span>{state.likeCount}</span> : <span>공감하기</span>}
    </button>
  );
}
