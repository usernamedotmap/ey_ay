

import React, { useRef } from 'react'
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { File } from 'lucide-react';





const urlEndpoint =    import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY; 
const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`,);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};


const Upload = ({setImage}) => {

  const ikUploadRef = useRef(null);

  const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = res => {
    console.log("Success", res);
    setImage(prev => ({
      ...prev,
      isLoading: false,
      dbData: res,
    }))
  };
  
  const onUploadProgress = progress => {
    console.log("Progress", progress);
  };
  
  const onUploadStart = evt => {
    const file = evt.target.files[0];

    const reader = new FileReader()
    reader.onloadend = () => {
    setImage(prev => ({
      ...prev,
      isLoading: true,
      aiData:  {
        inlineData: {
          data: reader.result.split(",") [1],
          mimeType: file.type,
        }
      }
    }));
    };
    reader.readAsDataURL(file);
  };


  return (
    <div>
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
         <IKUpload
         ref={ikUploadRef}
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress  }
          onUploadStart={onUploadStart}
          style={{display: "none"}}
        />
      {<label onClick={() => ikUploadRef.current.click()}>
        <File className="icon" color="black" />
      </label>}
      </IKContext>
    </div>
  )
}

export default Upload