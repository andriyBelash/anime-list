'use client'

function Modal({close, url}: { close: () => void, url: string }) {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center p-20">
    <strong onClick={close} className="text-6xl absolute top-[20px] right-[20px] align-center cursor-pointer alert-del text-[#FF6A3D]">&times;</strong>
      <div className="w-full h-full shadow-lg rounded-md bg-[#1A2238]">
      <iframe 
        width="100%" 
        height="100%" 
        src={url} 
        />
      </div>
    </div>
  );
}

export default Modal