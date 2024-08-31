import { memo, useMemo } from "react"
import { default as NextImage } from "next/image"
function DynamicImage({ imgSelected, width, height }) {
  //console.log("entro en DynamicImage")

  const props = useMemo(
    () => ({ imgSelected, width, height }),
    [imgSelected, width, height],
  )

  //console.log(props.imgSelected)
  //console.log(imgSelected);
  const imageWidth = props.width || 270
  const imageHeight = props.height || 204

  return (
    <NextImage
      src={props.imgSelected}
      alt="title"
      width={imageWidth}
      height={imageHeight}
      className={width < 270 ? "img-avatar" : "post-image"}
      priority
    />
  )
}

export default memo(DynamicImage)
//export default DynamicImage
