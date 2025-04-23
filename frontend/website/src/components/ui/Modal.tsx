import * as React from 'react';

export interface Props {
  title?: string;
  content?: string | React.ReactNode;
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = (props: Props) => {
  const { title, content, children } = props;

  return (
    <div>
      <div
        onClick={() => {
          const dialog = document?.getElementById(
            'id_modal'
          ) as HTMLDialogElement | null;
          dialog?.showModal();
        }}
      >
        {content}
      </div>

      <dialog id='id_modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <div className='flex justify-between items-center'>
              <h3 className='font-bold text-lg'>{title}</h3>
              <button className='btn btn-md btn-circle btn-ghost'>✕</button>
            </div>
          </form>

          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
