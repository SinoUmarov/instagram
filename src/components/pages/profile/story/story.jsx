'use client';
import Image from 'next/image';
import foto from '@/assets/img/pages/profile/profile/bmw_avtomobil_vid_sboku_190786_1920x1200.jpg';

const users = [
  { name: 'terrylucas', image: foto },
  { name: 'lauramatt...', image: foto },
  { name: 'harrypresc', image: foto },
  { name: 'ednamanz', image: foto },
  { name: 'christinaste', image: foto },
  { name: 'alexdoe', image: foto },
  { name: 'jessicar', image: foto },
  { name: 'michaelb', image: foto },
  { name: 'sophiam', image: foto },
  { name: 'tomwhite', image: foto },
  { name: 'tomwhite', image: foto },
];

const Stories = () => {
  return (
    <div className="w-full md:w-[70%] flex items-center gap-4 py-4 px-2">
      <div
        className="flex overflow-x-auto gap-4 flex-nowrap scrollbar-hide"
        style={{
          maxWidth: '100%',
        }}
      >
        {users.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-xs text-gray-800 flex-shrink-0"
            style={{
              width: '80px',
            }}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 relative">
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            </div>
            <span className="mt-1 truncate w-14 text-center">{user.name}</span>
          </div>
        ))}
      </div>

      <div className="hidden md:flex flex-col items-center text-xs text-gray-800 min-w-[80px]">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 relative flex items-center justify-center text-2xl text-gray-500">
          +
        </div>
        <span className="mt-1 truncate w-14 text-center">New</span>
      </div>

      
    </div>
  );
};

export default Stories;
