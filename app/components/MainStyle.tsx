import React from 'react';
import styles from './MainStyle.module.css'

type MainStyleProps = {
    children?: React.ReactNode; 
} & React.ComponentProps<'div'>;

const MainStyle: React.FC<MainStyleProps> = ({children}) => {

  return (
    <div 
      className='min-h-screen flex justify-center items-center'>
      <div 
        id={styles["container"]} 
        className='bg-contain rounded-[2.5rem] rounded-br-[100px] md:rounded-br-[150px] bg-white shadow-xl'
      >
        {children}
      </div>
    </div>
  );
}

export default MainStyle;