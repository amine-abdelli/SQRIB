import React from 'react'
import './TextArea.style.scss'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea className='text-area' value={value} onChange={onChange} maxLength={340} />
  )
}

export { TextArea } 