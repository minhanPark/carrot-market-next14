import { formatToTimeAgo, formatToWon } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProduct {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProduct) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        {/* 나중에 사용할 때는 width와 height를 지정하지 않고 fill 속성을 주면 Image에 absolute가 될 것이고 width, height에 100%를 준다 */}
        {/* 부모에서 relative를 주고 4/3 비율 등을 지정할 때 쓰면 될 듯하다. */}
        {/* {이미지 최적화도 코스트가 있으니?(vercel 아니면 없는것인가) unoptimized 속성을 주고 사용 안하는 것도 방법이다.} */}
        {/* {이미지 비율 유지되도록 cover 해주면 좋음} */}
        <Image
          src={`${photo}/avatar`}
          alt="title"
          fill
          className="object-cover"
        />
        {/* 기본적으로 Image는 onError 속성이 있어서 불러오지 못했을 경우에 대체 이미지를 보여줄 수 있다. */}
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-neutral-500 text-sm">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)} 원</span>
      </div>
    </Link>
  );
}
// interface ImageProps {
//     alt: string
//     src: string
//     width: number
//     height: number
// }

//타입도 이런식으로 사용하면 좋겠음
//type NextImage = typeof Image;
// 클라이언트 컴포넌트여야 한다.
// export default function ImageWithFallback({ alt, src, height, width}: ImageProps) {
//     const [isImgError, setIsImgError] = useState<boolean>(false)

//     return (
//     <Image
//         alt={alt}
//         src={isImgError ? DEFAULT_PROFILE_IMG_URL : src}
//         width={width}
//         height={height}
//         onError={() => setIsImgError(true)}
//     />
//     )
// }
//위와 같이 next image를 커스텀 해야 대체 이미지를 각각 넣어줄 수 있을 것이라고 생각함
