import * as React from 'react'
import Image, { ImageLoaderProps, ImageProps } from 'next/image'
import { buildImageUrl } from 'cloudinary-build-url'
import type { CldOptions } from '@cld-apis/types'

interface LoaderArgs {
  src: string
  keepAspectRatio?: boolean
  aspectRatio?: number
  options: CldOptions
}
const myLoader = ({
  src,
  keepAspectRatio,
  aspectRatio,
  options,
}: LoaderArgs): string => {
  if (
    keepAspectRatio &&
    aspectRatio &&
    !isNaN(aspectRatio) &&
    options.transformations?.resize !== undefined &&
    typeof options.transformations?.resize?.width
  ) {
    options.transformations.resize.height = Math.round(
      Number(options.transformations?.resize?.width) * aspectRatio
    )
  }
  return buildImageUrl(src, options)
}

interface CustomImageProps {
  keepAspectRatio?: boolean
  cloudOptions: CldOptions
  layout?: 'intrinsic' | 'fixed' | 'responsive' | 'fill'
}

export type NextImageCloudinaryProps = CustomImageProps & ImageProps

const MyImage = ({
  src,
  alt,
  width,
  height,
  className,
  keepAspectRatio = true,
  layout = 'intrinsic',
  cloudOptions,
  ...rest
}: NextImageCloudinaryProps): JSX.Element => {
  const aspectRatio = Number(height) / Number(width)
  return (
    <Image
      // @ts-ignore
      layout={layout}
      loader={(params: ImageLoaderProps): string =>
        myLoader({
          src: params.src,
          aspectRatio,
          keepAspectRatio,
          options: {
            cloud: {
              cloudName: cloudOptions.cloud?.cloudName,
            },
            transformations: {
              quality: params.quality,
              resize: {
                width: params.width,
              },
              ...(cloudOptions.transformations || {}),
            },
          },
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
