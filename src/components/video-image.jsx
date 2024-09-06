import React from 'react';
import {Header} from '../styled'

const VideoImage = () => {


    const title = 'ENCONTRÁ TU PARTIDO IDEAL';
    const content = 'Test';
    const link = 'Test';
    const linkTitle = 'Test';
    const linkUrl = 'Test';
    const linkTarget = 'Test';
    const videoUrl = 'Test';

  return (
    <div className="container mx-auto my-16">
        <div className={`text-images flex flex-col justify-between container mx-auto sm:max-w-[unset]`}>
        
        <div className={`text-content w-[45%] relative z-10 flex flex-col justify-center`}>
            
            {title && (
            <Header>
                {title}
            </Header>
            )}
            
            {/* {content && (
            // <p className='font-body text-xl text-black'>{content}</p>
            )} */}

        
            

            {link && (
            <a className="button btn btn-primary main-color-bg self-start text-white mt-8 inline-block" href={linkUrl} target={linkTarget} rel="noopener noreferrer">
                {linkTitle}
            </a>
            )}

        </div>

        <div className={`images-content flex w-[50%] relative z-10`}>
            <div className="video-wrapper relative w-full h-full">
            <video className="w-full h-full object-cover" src={'https://sparring.nyc3.cdn.digitaloceanspaces.com/sparring-preview.mp4'} autoPlay loop muted playsInline></video>
            </div>
        </div>

        
        </div>
    </div>
  );
}

export default VideoImage;