import db from "@/libs/db";
import getSession from "@/libs/session";
import { formatToTimeAgo } from "@/libs/utils";
import {
  EyeIcon as SolidEyeIcon,
  HandThumbUpIcon as SolidHandThumbUpIcon,
} from "@heroicons/react/24/solid";
import {
  EyeIcon as OutlineEyeIcon,
  HandThumbUpIcon as OutlineHandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  revalidatePath,
  unstable_cache as nextCache,
  revalidateTag,
} from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      // 기존의 값을 모르더라도 1을 올려줌
      // atomic number operation이라고 하는데
      // increment, decrement, multiply, divide, set있음
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  const isLike = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLike: Boolean(isLike),
  };
}
/**전달받은 인수를 태그에 연결시켜주기 위해 함수를 하나 더 감싸서 리턴해준다. 아이디를 가지는 특정 태그를 만들어준다 */
function getCachedLikeStatus(postId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }
  const session = await getSession();

  const { likeCount, isLike } = await getCachedLikeStatus(id, session.id!);
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar || "/vercel.svg"}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <SolidEyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton likeCount={likeCount} isLike={isLike} postId={id} />
      </div>
    </div>
  );
}
