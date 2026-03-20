'use client'
import type { ImgHTMLAttributes } from 'react'
import { useState } from 'react'
import { Streamdown } from 'streamdown'
import 'katex/dist/katex.min.css'
import ImagePreview from '@/app/components/base/image-uploader/image-preview'

interface StreamdownMarkdownProps {
  content: string
  className?: string
}

/**
 * Thumbnail image with click-to-preview, matching ImageGallery's behaviour.
 * Renders as an inline <img> (no <div> wrapper) so it's safe inside <p>.
 * ImagePreview uses createPortal → document.body, so no DOM nesting issue.
 */
function InlineImage({ src, alt, node: _, ...props }: ImgHTMLAttributes<HTMLImageElement> & { node?: unknown }) {
  const [preview, setPreview] = useState(false)
  if (!src) { return null }
  return (
    <>
      <img
        src={src}
        alt={alt ?? ''}
        className="h-[200px] max-w-full object-cover rounded-lg my-2 cursor-pointer"
        onClick={() => setPreview(true)}
        {...props}
      />
      {preview && <ImagePreview url={src} onCancel={() => setPreview(false)} />}
    </>
  )
}

export function StreamdownMarkdown({ content, className = '' }: StreamdownMarkdownProps) {
  return (
    <div className={`streamdown-markdown ${className}`}>
      <Streamdown components={{ img: InlineImage }}>{content}</Streamdown>
    </div>
  )
}

export default StreamdownMarkdown
