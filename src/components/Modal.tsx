import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
  short?: boolean;
};

export function Modal(props: ModalProps) {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog
        as='div'
        className='font-sans'
        onClose={() => props.setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={clsx(
              'fixed inset-0 z-40',
              'transition-opacity duration-500 ease-in-out',
              'flex flex-col items-center justify-center',
              {
                'opacity-100': props.open,
                'opacity-0': !props.open,
                'pointer-events-auto': props.open,
                'pointer-events-none': !props.open
              }
            )}
          />
        </Transition.Child>

        <div className='fixed inset-0 z-40 overflow-y-auto backdrop-contrast-50'>
          <div className='flex min-h-full items-center justify-center text-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  'relative z-40 bg-contrast rounded-2xl p-6',
                  props.short ? 'sm:max-h-[30rem]' : 'sm:max-h-[50rem]'
                )}
              >
                <div>{props.children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
