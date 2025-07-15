'use client';
import Image from 'next/image';
import foto from '@/assets/img/pages/profile/profile/bmw_avtomobil_vid_sboku_190786_1920x1200.jpg'; // путь можно адаптировать под твой alias

const Stories = () => {
  const users = [
    { name: 'terrylucas', image: foto },
    { name: 'lauramatt...', image: foto }, 
    { name: 'harrypresc', image: foto },
    { name: 'ednamanz', image: foto },
    { name: 'christinaste', image: foto },
    { name: 'New', image: null },
  ];

  return (
    <div className="flex gap-10 overflow-x-auto py-4">
      {users.map((user, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-xs text-gray-800 min-w-[56px]"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 relative">
            {user.image ? (
              typeof user.image === 'string' ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
                +
              </div>
            )}
          </div>
          <span className="mt-1 truncate w-14 text-center">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
