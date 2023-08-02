import React from 'react';

type Photo = {
    id: number;
    src: string;
    title: string;
    link: string;
};

type Props = {
    photos: Photo[];
};
const PhotoGallery: React.FC<Props> = ({photos}) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {photos.map((photo) => (
                <div
                    key={photo.id}
                    style={{
                        position: 'relative',
                        width: '300px',
                        height: '200px',
                        margin: '10px',
                        overflow: 'hidden',
                    }}
                ><a href={photo.link} target="_blank" rel="noopener noreferrer">
                    <img src={photo.src} alt="" style={{width: '100%', height: '100%'}}/>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{
                            fontFamily: 'Montserrat, Roboto, Arial, sans-serif, serif',
                            fontSize: '30px'
                        }}>{photo.title}</div>
                    </div>
                </a>
                </div>
            ))}
        </div>
    );
};


export default PhotoGallery;
