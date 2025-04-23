import React, { useState } from 'react';

interface SupportInfoProps {
  textToCopy: string;
  defaultTitle?: string;
  defaultResultText?: string;
  children?: React.ReactNode;
}

const CopyToClipboard: React.FC<SupportInfoProps> = (
  props: SupportInfoProps
) => {
  // ** Props
  const {
    textToCopy,
    defaultTitle = 'برای کپی کلیک کنید',
    defaultResultText = 'کپی شد!',
    children,
  } = props;

  // ** States
  const [title, setTitle] = useState(defaultTitle);

  const copied = () => {
    setTitle(defaultResultText);
    setTimeout(() => {
      setTitle(defaultTitle);
    }, 2000);
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Try Clipboard API first
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          copied();
        })
        .catch((err) => {
          err;
          fallbackCopyTextToClipboard(textToCopy);
        });
    } else {
      // Fallback if Clipboard API is not supported
      fallbackCopyTextToClipboard(textToCopy);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Prevent scrolling to bottom in mobile
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      copied();
    } catch (err) {
      err;
    }

    document.body.removeChild(textArea);
  };

  return (
    <div
      className='cursor-pointer tooltip tooltip-secondary'
      data-tip={title}
      onClick={handleCopy}
    >
      {children}
    </div>
  );
};

export default CopyToClipboard;
