'use client'
import type { ImgHTMLAttributes } from 'react'
import { Streamdown } from 'streamdown'
import 'katex/dist/katex.min.css'

interface StreamdownMarkdownProps {
  content: string
  className?: string
}

/**
 * Streamdown's built-in img component wraps <img> in a <div>.
 * Markdown renderers place images inside <p>, and <p> cannot contain <div>,
 * which causes React to break the DOM tree and hide the image entirely.
 * This plain <img> avoids that.
 */
function InlineImage({ src, alt, node: _, ...props }: ImgHTMLAttributes<HTMLImageElement> & { node?: unknown }) {
  if (!src) { return null }
  return <img src={src} alt={alt} className="max-w-full rounded-lg my-2" {...props} />
}

export function StreamdownMarkdown({ content, className = '' }: StreamdownMarkdownProps) {
  return (
    <div className={`streamdown-markdown ${className}`}>
      <Streamdown components={{ img: InlineImage }}>{content}</Streamdown>
    </div>
  )
}

export default StreamdownMarkdown
