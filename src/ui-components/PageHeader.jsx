import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link,useLocation } from 'react-router-dom';

export default function PageHeader({ title }) {
   
  return (
   <div className="fixed top-0 left-0 z-[50] w-full h-14 px-4 flex items-center backdrop-blur-md bg-white/30 border-b-[2px] border-gray-100">
      <Link to="/" className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <ChevronLeftIcon className="text-black" fontSize="medium" />
      </Link>
      <h1 className="mx-auto text-slate-600 text-md font-semibold tracking-wide">{title}</h1>
    </div>
  );
}
