

import { useNavigate } from "react-router-dom";

import { Button } from '@nextui-org/react';


function NotFound() {
  const navigate = useNavigate()

  return (
    <main className='m-auto text-center p-4 min-h-96 flex flex-col items-center justify-center'>
      <div className='font-semibold text-5xl xs:text-7xl break-all'>Página no encontrada</div>

      <Button variant='ghost' color='secondary' className='mt-8' onClick={() => navigate('/')}>
        Ir al inicio
      </Button>
    </main>
  );
}

export default NotFound;
