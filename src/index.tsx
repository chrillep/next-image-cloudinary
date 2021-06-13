import * as React from 'react'
import Image, { ImageLoaderProps, ImageProps } from 'next/image'

type CloudinaryCrop =
  | 'crop'
  | 'fill'
  | 'fill_pad'
  | 'fit'
  | 'imagga_crop'
  | 'imagga_scale'
  | 'lfill'
  | 'limit'
  | 'lpad'
  | 'mfit'
  | 'mpad'
  | 'pad'
  | 'scale'
  | 'thumb'

interface AdditionalLoaderArgs {
  transformations?: string
  keepAspectRatio?: boolean
  aspectRatio: number
  crop?: CloudinaryCrop
  cloudName: string
}
const myLoader = ({
  src,
  width,
  quality,
  transformations,
  keepAspectRatio,
  aspectRatio,
  crop,
  cloudName,
}: ImageLoaderProps & AdditionalLoaderArgs): string => {
  const params = ['f_auto', `w_${width}`, `q_${quality || 'auto'}`]
  if (keepAspectRatio && !isNaN(aspectRatio) && !isNaN(width)) {
    params.push(`h_${Math.round(width * aspectRatio)}`)
  }
  if (crop) {
    params.push(`c_${crop}`)
  }
  const paramsString = `${`${params.join(',')}${
    transformations ? `,${transformations}` : ''
  }`}`

  return `https://res.cloudinary.com/${cloudName}/image/upload/${paramsString}/${src}`
}

interface CustomImageProps {
  transformations?: string
  keepAspectRatio?: boolean
  crop?: CloudinaryCrop
  cloudName: string
  layout?: 'intrinsic' | 'fixed' | 'responsive' | 'fill'
}

export type NextImageCloudinaryProps = CustomImageProps & ImageProps

const MyImage = ({
  src,
  alt,
  width,
  height,
  transformations,
  className,
  keepAspectRatio = true,
  crop,
  layout = 'intrinsic',
  cloudName,
  ...rest
}: NextImageCloudinaryProps): JSX.Element => {
  const aspectRatio = Number(height) / Number(width)
  return (
    <Image
      // @ts-ignore
      layout={layout}
      loader={(params: ImageLoaderProps): string =>
        myLoader({
          ...params,
          transformations,
          aspectRatio,
          keepAspectRatio,
          crop,
          cloudName,
        })
      }
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  )
}

export default MyImage
